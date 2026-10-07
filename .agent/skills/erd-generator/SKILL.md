---
name: erd-generator
description: Use when requested to design an erd, read requirements and write a mermaid file using the correct syntax to docs/architecture/schema.mmd, generate a visual to docs/architecture/erd.svg using the local script scripts/render_erd.js, and handles automated syntax self-correction.
---

## Execution Workflow 

1.Parse domain requirements into entities, primary keys (PK), foreign keys (FK), and cardinalities.
2.Write the drafted Mermaid syntax directly to docs/architecture/schema.mmd.
3.Execute node scripts/render_erd.js docs/architecture/schema.mmd.
4.Self-Correction Loop: If execution fails with SYNTAX_ERROR, parse the error trace, adjust the Mermaid syntax in docs/architecture/schema.mmd, and re-run (up to 3 retries).
5.Final Output: Present the raw Mermaid block to the user and reference the generated image asset path (docs/architecture/erd.svg).

## Mermaid syntax rules

- Attribute format: `type name KEY` (e.g. `uuid id PK`, `uuid user_id FK`).
- Use a comma for multiple keys: `PK, FK`.
- Types and names must be single tokens (no spaces).
- Entity names: UPPER_SNAKE_CASE, no spaces.
- Relationships: `PARENT ||--o{ CHILD : "label"` (one-to-many), `PARENT ||--o| CHILD : "label"` (one-to-one).
- Every FK must reference an entity defined in the diagram.
