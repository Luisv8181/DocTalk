# DocTalk Architecture

## Mission
DocTalk is an open, evidence-informed discovery and curation layer for mental-health and wellbeing resources relevant to medical students, residents, physicians, educators, mental-health professionals, and researchers.

DocTalk is not a diagnostic, treatment, crisis-triage, or substitute-for-care system.

## System model
The project is intentionally layered:

1. **Knowledge layer** — structured resources and provenance in `data/resources.yml`.
2. **Curation layer** — evidence grading, review dates, inclusion/exclusion rules, and contributor workflow.
3. **Research layer** — landscape reports and source analysis in `research/`.
4. **Experience layer** — a static/searchable web interface that makes resources discoverable by audience, problem, need, geography, cost, privacy, language, evidence, and clinical/educational purpose.
5. **Future navigation layer** — optional natural-language or AI-assisted retrieval over the curated dataset. AI must retrieve and explain sources; it must not invent resources or provide diagnosis.

## Canonical data principle
The structured resource catalog is the source of truth for the web experience. Do not duplicate resource facts across many pages when they can be generated from canonical metadata.

## Resource lifecycle
Propose -> verify source -> classify -> add metadata -> review -> publish -> periodic re-review -> archive/replace when stale.

## Core metadata
See `docs/resource-schema.md`. At minimum track identity, audience, type, topics, geography, cost/access, evidence basis, privacy/confidentiality, clinical-use status, emergency status, language access, provenance, last review, limitations.

## Architecture constraints
- Privacy by default. No login required for core discovery.
- No collection of sensitive mental-health information.
- Clear emergency pathways.
- No unsupported clinical claims.
- Preserve official source links rather than copying protected content.
- Separate evidence level from popularity or anecdotal usefulness.
- Make uncertainty visible.
- Design for accessibility from the beginning.

## Future technical direction
Prefer a static-first architecture. The initial site can be generated from YAML/JSON into GitHub Pages. Search can be client-side for modest catalogs. A server/API should only be added when scale or advanced functionality requires it.

Potential future components:
- schema validation
- dead-link checker
- review-date checker
- searchable static site
- resource comparison/filtering
- geographic directory
- source/evidence summaries
- retrieval-augmented navigator constrained to the catalog
