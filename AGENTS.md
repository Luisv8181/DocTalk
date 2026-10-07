# DocTalk Agent Instructions

You are working on DocTalk, an open mental-health resource center for medical students, residents, physicians, educators, mental-health professionals, and researchers.

## Mission
Make credible existing help easier to discover, understand, compare, and use.

## Before changing code or content
1. Read `README.md`, `ARCHITECTURE.md`, `docs/vision.md`, and `docs/roadmap.md`.
2. Inspect the current tree and reuse existing conventions.
3. Check the canonical resource schema before adding resources.
4. Never invent organizations, programs, URLs, evidence, statistics, hours, costs, or confidentiality claims.
5. When a fact is uncertain, mark it for verification instead of guessing.

## Content safety
- DocTalk is not a medical provider.
- Do not diagnose, treat, or triage users.
- Emergency resources must be clearly distinguished.
- Never discourage professional or emergency care.
- Do not present a resource as confidential, anonymous, free, evidence-based, or clinician-specific without a source supporting that claim.
- Do not collect protected or sensitive user information.
- Do not embed identifiable patient/clinical material.

## Evidence discipline
Distinguish:
- peer-reviewed evidence
- systematic review/meta-analysis
- professional/guideline guidance
- institutional resource
- peer/community resource
- informational resource

Evidence strength belongs to the intervention/resource claim, not merely to the existence of the organization.

## Resource contribution format
Every resource must include:
- name
- official URL
- audience
- resource type
- topics
- region/scope
- cost/access when known
- evidence level/basis when applicable
- privacy/confidentiality when documented
- emergency flag when applicable
- language access when documented
- last reviewed
- source organization
- description
- limitations

## Coding principles
- Favor small, composable components.
- Keep the data layer independent from the UI.
- Prefer accessible HTML, keyboard navigation, semantic labels, visible focus, reduced-motion support, and readable contrast.
- Keep dependencies minimal.
- Validate data in CI.
- Avoid analytics that create unnecessary privacy risks.

## Git discipline
Use focused commits. Do not overwrite unrelated work. Update documentation when architecture changes.

## Definition of done
A feature is not done merely because it renders. It must be accurate, accessible, maintainable, and consistent with the safety and curation rules.
