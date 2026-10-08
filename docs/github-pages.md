# DocTalk GitHub Pages

DocTalk should have a public, static-first GitHub Pages site generated from the repository's canonical resource catalog.

## Goal
Turn the repository into a usable public resource center without introducing a backend or collecting sensitive information.

## MVP
- Landing page explaining DocTalk.
- Audience selector.
- Need/topic filters.
- Resource cards.
- Emergency-resource prominence.
- Evidence and provenance labels.
- Last-reviewed dates.
- Official source links.
- Accessibility-first responsive design.
- No login required.
- No mental-health disclosure collection.

## Data flow
`data/resources.yml` -> validation -> static site data -> browser search/filtering.

The UI must not maintain a second source of truth.

## Deployment
Use GitHub Actions to build the site and deploy the generated static artifact to GitHub Pages.

The site should be deployable from `main` and should require no server runtime.

## Future
The same static site can later support:
- advanced search
- geographic filtering
- resource comparison
- contributor workflows
- specialty collections
- constrained AI-assisted retrieval
