import { test, expect } from '@playwright/test';

for (const project of ['gguk', 'purple']) {
  test(`project card opens ${project}`, async ({ page }) => {
    await page.goto('./');
    await page.locator(`.project-card[href$="/${project}/"]`).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${project}/$`));
    await expect(page.locator('.case-study')).toHaveCount(3);
  });
  test(`${project} direct URL survives reload`, async ({ page }) => {
    await page.goto(`projects/${project}/`);
    await page.reload();
    await expect(page.locator('h1')).toContainText(new RegExp(project, 'i'));
    await expect(page.locator('.diagram-frame img')).toHaveCount(3);
    expect(await page.locator('.diagram-frame img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  });
}

test('mobile table of contents navigates and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('projects/gguk/');
  await page.locator('.project-toc summary').click();
  const link = page.locator('.project-toc a').last();
  const anchor = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${anchor}$`));
  await expect(page.locator('.project-toc details')).not.toHaveAttribute('open');
});

test('Escape closes diagram and returns focus', async ({ page }) => {
  await page.goto('projects/gguk/');
  const opener = page.locator('.diagram-open').first();
  await opener.click();
  await expect(page.locator('dialog[open]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('content and original diagram work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('projects/purple/');
  await expect(page.locator('.case-study')).toHaveCount(3);
  await page.locator('.diagram-open').first().click();
  await expect(page).toHaveURL(/\/diagrams\/billing.svg$/);
  await expect(page.locator('svg')).toBeVisible();
  await context.close();
});

test('PDF link returns a real PDF', async ({ page, request }) => {
  await page.goto('./');
  const href = await page.locator('a[href$="younha-portfolio.pdf"]').first().getAttribute('href');
  expect(href).toBeTruthy();
  const response = await request.get(href);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('unknown route returns 404 and a working home link', async ({ page }) => {
  const response = await page.goto('missing-verification-route/');
  expect(response.status()).toBe(404);
  await page.locator('main a[href="/"]').click();
  await expect(page.locator('.project-card')).toHaveCount(2);
});

for (const width of [320, 390, 1440]) {
  for (const route of ['./', 'projects/gguk/', 'projects/purple/']) {
    test(`${route} has no viewport overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });
  }
}

test('desktop TOC numbers remain on one line', async ({ page }) => {
  await page.goto('projects/gguk/');
  const labels = await page.locator('.project-toc .mono').evaluateAll(elements => elements.map(element => ({ height: element.getBoundingClientRect().height, lineHeight: Number.parseFloat(getComputedStyle(element).lineHeight) })));
  expect(labels).toHaveLength(3);
  for (const label of labels) expect(label.height).toBeLessThanOrEqual(label.lineHeight + 1);
});

test('print cover links to the public portfolio', async ({ page }) => {
  await page.goto('print/');
  const link = page.locator('.print-intro a[href="https://labyrinth30.github.io/"]');
  await expect(link).toBeVisible();
  await expect(link).toHaveText('https://labyrinth30.github.io/');
});
