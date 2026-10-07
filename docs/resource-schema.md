# DocTalk Resource Schema

The schema is designed to make every resource searchable, reviewable, and auditable.

## Required fields
- `name`
- `official_url`
- `source_organization`
- `audience`
- `type`
- `topics`
- `access`
- `description`
- `last_reviewed`

## Recommended fields
- `scope`
- `region`
- `cost`
- `evidence_level`
- `evidence_basis`
- `privacy`
- `confidentiality`
- `clinical_use`
- `emergency_resource`
- `language_access`
- `limitations`
- `review_status`

## Controlled values

### Audience
`medical-student`, `resident`, `physician`, `fellow`, `educator`, `mental-health-professional`, `researcher`, `institution`, `general`

### Type
`crisis-support`, `peer-support`, `counseling`, `physician-health-program`, `curriculum`, `assessment`, `toolkit`, `research`, `community`, `digital-tool`, `policy`, `education`, `directory`

### Evidence level
`systematic-review-meta-analysis`, `controlled-study`, `observational-research`, `qualitative-evidence`, `professional-guidance`, `institutional-resource`, `community-resource`, `informational`, `unknown`

### Access
Keep access factual and specific. Examples:
- public-web
- phone
- text
- chat
- referral-required
- institution-required
- membership-required

## Important distinction
`evidence_level` describes the available evidence for the resource or intervention. It does not mean the sponsoring organization is universally authoritative, nor does it mean every use of a resource is evidence-based.
