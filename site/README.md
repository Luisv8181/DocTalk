# DocTalk Site

The canonical resource catalog is data/resources.yml.

During the GitHub Pages build, scripts/build-site.mjs converts that YAML into site/generated/resources.json. The browser reads the generated catalog. Do not maintain a second hand-written resource dataset in the site.

The site is dependency-light. Build dependencies are used only during deployment to transform the canonical YAML catalog into browser-readable JSON.

GitHub Pages deployment is handled by .github/workflows/pages.yml.
