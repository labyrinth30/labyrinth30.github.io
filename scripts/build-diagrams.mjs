import { readdir, mkdir, writeFile, unlink } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
const diagrams = (await readdir("src/diagrams"))
	.filter((name) => name.endsWith(".mmd"))
	.sort();
if (diagrams.length === 0) throw new Error("No diagrams found in src/diagrams");
await mkdir("public/diagrams", { recursive: true });
const configPath = join(tmpdir(), `portfolio-puppeteer-${process.pid}.json`);
const config = process.env.PUPPETEER_EXECUTABLE_PATH
	? {
			executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
			args: ["--no-sandbox"],
		}
	: { args: ["--no-sandbox"] };
await writeFile(configPath, JSON.stringify(config));
try {
	for (const name of diagrams) {
		execFileSync(
			"node_modules/.bin/mmdc",
			[
				"-i",
				`src/diagrams/${name}`,
				"-o",
				`public/diagrams/${name.replace(".mmd", ".svg")}`,
				"-c",
				"scripts/mermaid.json",
				"-p",
				configPath,
				"-b",
				"transparent",
			],
			{ stdio: "inherit" },
		);
	}
} finally {
	await unlink(configPath);
}
