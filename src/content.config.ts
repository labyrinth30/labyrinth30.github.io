import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const requiredText = z.string().min(1);
const cases = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/cases" }),
	schema: z.object({
		project: z.enum(["gguk", "purple"]),
		order: z.number().int().min(1).max(3),
		title: requiredText,
		summary: requiredText,
		role: requiredText,
		decision: requiredText,
		tradeoff: requiredText,
		diagram: z.enum([
			"async",
			"concurrency",
			"queue",
			"billing",
			"query",
			"recovery",
		]),
		diagramCaption: requiredText,
		sources: z.array(
			z.object({ label: requiredText, url: z.url({ protocol: /^https$/ }) }),
		),
	}),
});
const projects = defineCollection({
	loader: glob({ pattern: "*.json", base: "./src/content/projects" }),
	schema: z.object({
		name: requiredText,
		number: requiredText,
		category: requiredText,
		tagline: requiredText,
		description: requiredText,
		role: requiredText,
		period: requiredText,
		stack: z.array(requiredText),
		focus: requiredText,
		scope: requiredText,
	}),
});
export const collections = { cases, projects };
