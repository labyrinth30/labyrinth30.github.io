import { chromium } from '@playwright/test';
import { mkdir, rm, rename, readFile } from 'node:fs/promises';
import { serveDist } from './serve-dist.mjs';

const output = 'dist/downloads/younha-portfolio.pdf';
const temporary = `${output}.tmp`;
await mkdir('dist/downloads', { recursive: true });
await rm(output, { force: true });
await rm(temporary, { force: true });
const server = await serveDist();
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('requestfailed', request => failures.push(request.url()));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  const response = await page.goto(`${server.url}print/`, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error('Print route did not load successfully');
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(async image => {
      await image.decode();
      if (!image.naturalWidth) throw new Error(`Image not loaded: ${image.src}`);
    }));
  });
  if (await page.locator('.case-study').count() !== 6) throw new Error('Expected all six case studies');
  if (failures.length) throw new Error(`Print resources failed: ${failures.join(', ')}`);
  await page.pdf({ path: temporary, format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="font-size:8px;color:#61655e;width:100%;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>' });
  const pdf = await readFile(temporary);
  if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-')) || pdf.length < 10000) throw new Error('Invalid PDF output');
  await rename(temporary, output);
  console.log(`PDF exported: ${output} (${pdf.length} bytes)`);
} finally {
  await browser?.close();
  await server.close();
  await rm(temporary, { force: true });
}
