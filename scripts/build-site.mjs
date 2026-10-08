import { readFile, writeFile, mkdir } from "node:fs/promises";
import YAML from "yaml";

const source = await readFile("data/resources.yml", "utf8");
const catalog = YAML.parse(source);

await mkdir("site/generated", { recursive: true });
await writeFile(
  "site/generated/resources.json",
  JSON.stringify(catalog.resources ?? [], null, 2) + "\n",
  "utf8"
);
