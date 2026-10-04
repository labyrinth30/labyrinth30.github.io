import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
export default defineConfig({
	site: "https://labyrinth30.github.io",
	base: "/portfolio",
	trailingSlash: "always",
	output: "static",
	integrations: [mdx()],
	markdown: { shikiConfig: { theme: "github-light", wrap: false } },
	vite: { build: { sourcemap: false } },
});
