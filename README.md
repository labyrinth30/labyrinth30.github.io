# 이윤하 · 백엔드 포트폴리오

Astro와 MDX로 만든 정적 포트폴리오입니다. 홈에서 GGUK·Purple 상세로 이동하며 모든 사례의 본문을 웹과 인쇄 화면이 공유합니다.

## 개발

Node.js 22.12 이상, npm을 사용합니다.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

사이트는 루트 경로(`/`)에서 제공됩니다. `build`는 콘텐츠 스키마 검사, 사례별 Mermaid SVG 생성, 정적 HTML 생성을 순서대로 실행합니다. Mermaid CLI는 Puppeteer의 Chrome을 사용합니다. 브라우저 설치가 비활성화된 환경에서는 `npx puppeteer browsers install chrome`을 실행하거나 `PUPPETEER_EXECUTABLE_PATH`에 설치된 Chrome 실행 파일을 지정하세요.

## 콘텐츠

- `src/content/projects/*.json`: 프로젝트 소개·담당 범위·기간·기술
- `src/content/cases/*.mdx`: 사례 요약·의사결정·본문·공개 출처
- `src/diagrams/*.mmd`: Mermaid 원본. 생성 SVG는 빌드 산출물입니다.
- `src/content.config.ts`: 필수 필드와 프로젝트 ID 스키마
- `DESIGN.md`: 색상·서체·간격·컴포넌트·접근성 규칙

회사 사례에는 공개 가능한 설계·검증 요약만 넣습니다. 비공개 코드, 내부 URL, 원본 로그와 고객 자료를 추가하지 않습니다. 수치를 수정할 때에는 측정 범위·시점·한계도 함께 갱신하세요. 공개 코드 발췌는 고정 커밋 링크를 유지합니다.

## 페이지

두 가지 버전을 생성합니다. `/`는 Purple을, `/portfolio/`는 GGUK를 프로젝트 01로 보여 줍니다. 버전마다 홈, `projects/gguk/`, `projects/purple/`, `print/`, `downloads/younha-portfolio.pdf`가 있고 `/404.html`은 공통입니다. 버전별 순서와 경로 접두사는 `src/lib/editions.ts`에서 정합니다. 인쇄 화면은 별도 콘텐츠 복사 없이 같은 MDX를 렌더링합니다.

## PDF와 재현 가능한 검증

```sh
npm ci
npx playwright install chromium
npx puppeteer browsers install chrome
npm run check
npm run build
npm run export:pdf
npm run test:e2e
```

Linux에서는 Chromium 시스템 라이브러리와 한글 글꼴이 필요합니다. `npx playwright install --with-deps chromium` 및 배포판의 `fonts-noto-cjk` 패키지를 설치하세요. CI는 이를 자동 설치합니다.

PDF는 Chromium이 빌드된 인쇄 화면의 글꼴과 모든 그림을 기다린 뒤 A4로 생성합니다. 결과는 버전별로 `dist/downloads/younha-portfolio.pdf`(Purple 먼저)와 `dist/portfolio/downloads/younha-portfolio.pdf`(GGUK 먼저)입니다. 내보내기 시작 시 이전 PDF를 제거하며 오류가 발생하면 실패 종료합니다. 콘텐츠 수정 뒤에는 `build → export:pdf → test:e2e`를 다시 실행하세요. PDF 페이지 배치는 글꼴과 브라우저 버전에 따라 달라질 수 있으므로 제출 전 모든 페이지를 확인하세요.

`npm run serve:dist`는 정적 빌드 결과를 `http://127.0.0.1:4173/`에서 제공합니다. E2E는 이 서버를 자동 실행하고 프로젝트 이동, 직접 접근·새로고침, 모바일 목차, 다이어그램 Escape·포커스 복귀, JavaScript 비활성화, PDF 응답과 404를 확인합니다. 캡처와 실패 추적은 `test-results/`에, JSON 결과는 `test-results/results.json`에 남습니다.

게시된 사이트를 같은 테스트로 확인할 수 있습니다.

```sh
BASE_URL=https://labyrinth30.github.io/ npm run test:e2e
```

## GitHub Pages 배포

저장소 이름은 `labyrinth30.github.io`, 배포 브랜치는 `main`입니다. 저장소 Settings → Pages → Build and deployment에서 **GitHub Actions**를 선택하세요. `.github/workflows/deploy.yml`은 Node.js 24에서 의존성 설치, 검사, 빌드, PDF 생성, E2E를 모두 통과한 `dist/`만 Pages에 게시합니다. PR에서는 같은 검증을 실행하고 배포하지 않습니다.

[사이트](https://labyrinth30.github.io/) · [PDF](https://labyrinth30.github.io/downloads/younha-portfolio.pdf) · [GGUK 먼저 보기](https://labyrinth30.github.io/portfolio/)

다른 저장소 이름이나 도메인을 사용하면 `astro.config.mjs`의 `site`/`base`, 정적 검증 서버의 base 경로, E2E 경로 및 이 문서의 URL을 함께 수정하세요.
