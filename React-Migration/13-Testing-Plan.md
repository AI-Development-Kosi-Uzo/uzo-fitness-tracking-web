### Testing Plan

Tools: Vitest + Testing Library, Playwright.

Unit
- Utilities: volume computations, streaks, sorting/grouping
- Zustand stores: timers tick/pause/resume

Integration
- Form flows with RHF+Zod: template/exercise editors
- React Query repos: CRUD against Dexie (use fake IndexedDB)

E2E (Playwright)
- Create template → activate plan → start session → add/toggle sets → finish → see history entry and trends
- Upload photos → compare → edit date/weight → verify display
- Offline mutation queue then online flush

Test IDs
- data-testid="exercise-row-<id>", "set-row-<id>-<position>", "start-session-btn", "finish-session-btn"


