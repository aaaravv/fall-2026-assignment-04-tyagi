---
name: kysely-migration-generator
description: Use when requested to generate a kysely database migration, use an existing mermaid erd schema and translate it into a type safe kysely database migration
---

## Execution Workflow
1.Read the mermaid ERD schema from docs/architecture/schema.mmd: to extract entities, attributes, keys, and relationship cardinalities.
2.Translate to kysely: map tables, columns, constraints, and relationships into type-safe Kysely migration code.
3.Generate migration file: write the kysely script to a migration file in src/db/migrations/<timestamp>_<migration_name>.ts.

## Translation and Structural Rules

Entities to Tables: Map Mermaid entities to snake_case table names (e.g., USERS → users).
Keys & Columns: Convert PK attributes to auto-generating IDs/UUIDs and FK attributes to .references().onDelete('cascade').
Cardinalities: Correctly map ||--o{ (one-to-many) and ||--o| (one-to-one with unique constraints).
Structure: Enforce exports for both up(db: Kysely<any>) and down(db: Kysely<any>) functions. The down function must drop tables in reverse dependency order.

