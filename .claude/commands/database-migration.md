---
name: database-migration
description: Workflow command scaffold for database-migration in RocKit.
allowed_tools: ["Bash", "Read", "Write"]
---

# /database-migration

Use this workflow when working on **database-migration** in RocKit projects.

## Goal

Database schema changes with migration files — safe, reversible, tested.

## Tech Stack

- Primary: PostgreSQL + Prisma ORM
- Also supported: Redis schema changes

## Suggested Sequence

1. **Analyze** current schema and migration history
2. **Create** migration file with up + down
3. **Test** migration against a copy of production data
4. **Verify** no data loss in the migration path
5. **Deploy** with rollback plan documented

## Notes

- Always include a down migration
- Test migrations against real-ish data volumes
- Document breaking schema changes in commit body
