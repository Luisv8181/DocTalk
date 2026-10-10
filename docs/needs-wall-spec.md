# DocTalk Needs Wall — Specification (Draft)

**Status:** proposal — for maintainer review, not yet adopted.
**Date:** 2026-10-09
**Relates to:** `research/medical-mental-health-landscape-report.md` (§5, §13), `docs/roadmap.md` (Phase 3–4), `docs/safety.md`, `docs/curation.md`

## 1. Problem

Medical students, residents, and physicians carry ideas that could improve
their quality of life — a better handoff ritual, a peer-support format that
fits a night shift, a scheduling tweak that protects sleep — but they have
no time to build them and no venue to share them. DocTalk currently
catalogs *answers*. It has no structured way to collect *questions and
unmet needs* from the people it serves.

Without that signal, curation is guesswork: we cannot know which gaps
matter most, which tools are worth cataloging, or what is worth building
later. The landscape report's core finding is fragmentation; the Needs Wall
is the other half of the response — a public, structured record of what the
community says is missing.

This also advances the existing roadmap: Phase 3 calls for "resource
request issues" and Phase 4 for community infrastructure. The Needs Wall is
the concrete form of both.

## 2. Concept

A **Needs Wall**: a public board of unmet needs and tool ideas, submitted
by medical trainees and professionals, curated by maintainers, rendered on
the DocTalk site. Each need is a structured record, not a free-floating
comment thread. The wall answers: *what do the people doing this work say
would help them?*

It is explicitly **not** a place to request clinical advice, crisis help,
or diagnoses. Those are redirected (see §6).

## 3. Design principles

- **Repository first.** Needs live as canonical data (`data/needs.yml`),
  versioned in git, same as resources. Discussion happens elsewhere;
  the record of what was asked is structured and durable.
- **Never invent needs.** A need enters the catalog only from a real
  submission (GitHub Discussion, contributor form, documented outreach).
  Maintainers may clarify wording; they may not author needs on the
  community's behalf.
- **Inclusion is not endorsement.** Listing a need means it was judged
  relevant enough to record. It does not mean DocTalk endorses a proposed
  solution or will build it.
- **Safety boundaries hold.** `docs/safety.md` applies in full: no
  diagnosis, no triage, no discouraging professional or emergency care,
  privacy by default.
- **Close the loop.** Every need carries a status. A wall of unanswered
  asks is worse than no wall; triage cadence is part of the spec (§7).

## 4. Data model: `data/needs.yml`

```yaml
- id: need-001
  title: "Brief, plain-language title"
  audience: [resident, medical-student]   # reuse resource schema audience vocab
  domains: [scheduling, rest]             # work-life areas; controlled list below
  description: "What is missing or painful, in the submitter's terms."
  why_it_matters: "Why this would improve quality of life or care."
  submitted_via: discussion               # discussion | form | outreach
  submitted_ref: "https://github.com/.../discussions/12"  # provenance, when public
  status: submitted                       # submitted | under-review | matched | in-progress | addressed | out-of-scope
  related_resources: [physician-support-line]  # ids from data/resources.yml ("while you wait")
  created_date: 2026-10-09
  notes: "Maintainer notes; never submitter PII."
```

**Domains (initial controlled list):** scheduling, documentation,
rest/sleep, peer-connection, mentorship, family/caregiving, financial,
licensing-confidentiality, belonging, career-transitions, moral-distress.
Extend only with maintainer agreement, as with the resource taxonomy.

**Statuses:**
- `submitted` — recorded, awaiting triage.
- `under-review` — a maintainer is assessing scope and duplicates.
- `matched` — existing catalog resources address it; linked in
  `related_resources`.
- `in-progress` — someone (not necessarily DocTalk) is building or
  piloting a response; notes say who, when known.
- `addressed` — a cataloged resource or shipped response resolves it.
- `out-of-scope` — e.g. requests for clinical advice; notes record the
  redirect given.

## 5. Submission and moderation

**Phase A intake:** a GitHub Discussions category, "Needs & ideas."
Maintainers triage new discussions on a regular cadence and transcribe
 qualifying asks into `data/needs.yml`.

**Submission norms (pinned in the category):**
- Share the *need*, not personal health information. Role and training
  stage are enough context ("PGY-2, nights").
- One need per thread; plain language over jargon.
- No requests for medical advice, diagnosis, or crisis counseling —
  those threads are locked with a pointer to crisis resources and the
  catalog, not debated.

**Moderation:** maintainers remove PHI or identifying detail on sight,
lock advice-seeking threads with a standard redirect, and mark duplicates
by linking to the canonical need record. A need describing self-harm or
abuse gets a crisis-resource pointer and a lock — never a discussion.

## 6. Safety

- The wall collects *system and quality-of-life needs*, not clinical
  presentations. Anything reading as a request for care is redirected,
  not cataloged.
- No submitter PII is stored in `needs.yml`. `submitted_ref` links only
  to public discussions.
- Emergency resources remain prominent on every page that renders the
  wall, per `docs/safety.md`.
- As with resources: listing a need never implies DocTalk endorses any
  particular solution, and nothing on the wall substitutes for
  professional judgment or care.

## 7. Governance

- **Triage cadence:** new discussions reviewed at least weekly; each
  transcribed need gets a status within that cycle.
- **Who triages:** maintainers listed in `docs/curation.md` workflow
  (specialty maintainers in Phase 3 take their domains).
- **Duplicates:** merged into the earliest record; the discussion is
  linked as additional provenance.
- **Stale needs:** `under-review` older than 90 days is re-examined or
  marked `out-of-scope` with notes. The wall must not become a
  graveyard; status honesty is the feature.

## 8. Site rendering

A simple page, generated from `data/needs.yml` by the existing static
build:
- Filter by audience, domain, and status.
- Each need shows title, description, why-it-matters, status, and
  `related_resources` ("while you wait, these exist").
- Reading requires no login. Submission links out to Discussions
  (Phase B may add a structured form).
- Emergency/crisis information is visible on the page, not buried.

## 9. Relationship to the tools track and roadmap

The Needs Wall is the demand signal for everything downstream:
- Needs marked `matched`/`addressed` validate catalog coverage.
- Recurring unmatched needs in the technology domain become candidates
  for the **digital-tool catalog track** (resources of
  `type: digital-tool`, curated under the same verification checklist).
- Only where demand is sustained *and* safety review is clear does a
  need become a candidate for DocTalk to build or bless a tool —
  Phase 4+ territory, never the starting move.

Build order stays: repository first, interface second, intelligence last.

## 10. Rollout

- **Phase A (now):** Discussions category + manually curated
  `data/needs.yml` + rendered page. Seed with a small number of
  clearly-sourced needs (e.g. from published trainee surveys), each
  with provenance — never invented.
- **Phase B:** structured submission form feeding the same schema.
- **Phase C:** needs automatically surface alongside related resources
  in search; maintainer dashboard for triage.

## 11. Success metrics

- Submissions per month; % triaged within the cadence.
- % of needs `matched` or `addressed` (coverage signal).
- Recurring themes (feeds catalog priorities).
- Contributor growth; institutional adoption of the wall as a
  listening channel.

## 12. Open questions for the maintainer

1. Should submitters be anonymous-by-default (role only), or is
   GitHub identity acceptable for Phase A?
2. Triage cadence: weekly, or tied to the existing review cycle?
3. Seed set: which published sources may we transcribe needs from
   with provenance, before community submissions arrive?
