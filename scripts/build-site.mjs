import { readFile, writeFile, mkdir } from "node:fs/promises";
import YAML from "yaml";

const resourcesSource = await readFile("data/resources.yml", "utf8");
const catalog = YAML.parse(resourcesSource);

const needsSource = await readFile("data/needs.yml", "utf8");
const needsDoc = YAML.parse(needsSource);

await mkdir("site/generated", { recursive: true });
await writeFile(
  "site/generated/resources.json",
  JSON.stringify(catalog.resources ?? [], null, 2) + "\n",
  "utf8"
);
await writeFile(
  "site/generated/needs.json",
  JSON.stringify(needsDoc.needs ?? [], null, 2) + "\n",
  "utf8"
);
