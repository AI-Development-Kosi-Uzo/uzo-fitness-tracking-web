feat(settings): implement /settings with Permissions + Preferences

Summary
- Implement `/settings` with sections: Permissions (Notifications, Camera) and Preferences (stub toggles)
- Add permissions utility for feature detection and user-initiated permission requests
- Wire route in router; add unit test and E2E smoke test; exclude E2E from unit runner

Completed from React-Migration/16-Tasks.md
- [x] `/settings`
- [x] Files: `app/src/routes/settings/index.tsx`
- [x] UI components: `app/src/components/settings/{Permissions.tsx,PreferenceRow.tsx}`
- [x] Vitest unit tests for utils and stores (permissions utils)
- [x] Playwright e2e for core flows (smoke + settings)
- [x] Testing files updated: `vitest.config.ts`, `playwright.config.ts`, `app/tests/unit/permissions.spec.ts`, `app/tests/e2e/smoke.spec.ts`, `app/tests/e2e/settings.smoke.spec.ts`
- [x] Scaffold deps used: TanStack Router; Dexie tables and indexes

Files touched (high-level)
- `app/src/routes/settings/index.tsx`
- `app/src/components/settings/Permissions.tsx`
- `app/src/components/settings/PreferenceRow.tsx`
- `app/src/utils/permissions.ts`
- `app/src/router.tsx`
- `app/vitest.config.ts`
- Tests under `app/tests/...`

Verification
- Unit: `npm test` (Vitest) — passing
- E2E: `npm run test:e2e:smoke` and `npm run test:e2e:settings` — passing

Notes
- Permission prompts remain user-initiated only (no background requests)

