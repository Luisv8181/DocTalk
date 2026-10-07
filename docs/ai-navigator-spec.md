# DocTalk AI Navigator Specification

## Purpose
Provide natural-language retrieval over the curated DocTalk catalog.

Example:
"I am a PGY-2 resident looking for something free, private, and available after work."

## Retrieval rules
1. Convert the request into catalog filters.
2. Retrieve only approved catalog entries.
3. Explain why each result matched.
4. Show source organization, official URL, and review date.
5. Surface limitations and uncertainty.
6. Keep emergency pathways visible.
7. Never fabricate a resource, phone number, eligibility rule, cost, or confidentiality promise.

## Explicit non-goals
- diagnosis
- treatment planning
- prescribing
- hidden suicide-risk scoring
- autonomous emergency triage
- replacing licensed clinicians

## Preferred implementation
Start with deterministic metadata filtering and search. Add an LLM only as a query interpretation/explanation layer over the canonical dataset.
