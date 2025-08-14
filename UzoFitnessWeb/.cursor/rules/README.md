# Concurrency Rules

- Respect ownership per directory; do not modify outside your scope
- Use feature branches with required CI gates
- Rebase daily to reduce conflicts
- UI must depend on `src/data` contracts only
- Breaking contract changes require ADR and coordination