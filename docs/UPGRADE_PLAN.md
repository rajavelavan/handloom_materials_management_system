# HMMS: MVP → Enterprise Upgrade — Plan & Progress Log

This is the single source of truth for the enterprise upgrade effort: what was planned, what's actually been done, and what's still open. Update this file at the end of every phase — don't let progress live only in chat history.

**Direction agreed on 2026-08-10**: thorough, industry-standard rebuild; no fixed timeline; target is a real production system for handloom weavers, built to investor-facing/high-scale standards.

Status legend: ✅ Done · 🚧 In progress · 🔲 Not started

---

## Phase 0 — Critical Security Incident Response — ✅ Done (2026-08-10)

**Why**: `server/.env` (live MongoDB Atlas credentials + JWT secret) and `client/.env` were tracked in git since the first commit, on a **public** GitHub repo (`rajavelavan/handloom_materials_management_system`). The credentials were live and exploitable.

**Decision**: single developer, no collaborators — skipped rewriting git history (`git filter-repo` + force-push). The old leaked values remain visible forever in commits `0f13846`, `188d8af`, `ed03072`, but are harmless once rotated. This trade-off can be revisited later if the repo ever gains collaborators or more sensitive data.

**What was done**:
- Rotated the MongoDB Atlas password for user `appaiyaraja` (done via Atlas dashboard by the project owner). Verified the app connects successfully with the new credentials.
- Generated and installed a new, strong `TOKEN_SECRECT` (256-bit random hex) in `server/.env`, replacing the trivially-guessable `HMMS_project`.
- Moved hardcoded Mailtrap SMTP credentials and sender address out of `server/helper/sendMail.js` into env vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`). Still sandbox/test credentials for now — real provider swap is scheduled in Phase 3.
- Fixed `.gitignore` in both `client/` and `server/` to exclude plain `.env` (previously only `.env.local` variants were ignored).
- Added `server/.env.example` and `client/.env.example` documenting required variables with no real values.
- Ran `git rm --cached` on both `.env` files to stop tracking them going forward (local files kept). Committed by the project owner.

**Still open / reminders**:
- Update the `hmms-server` Vercel project's environment variables (`MONGO_URI`, `TOKEN_SECRECT`) to match, and redeploy — production is still on the old values until this happens.
- The Mailtrap credentials are still sandbox (non-production) — verification/reset emails don't reach real inboxes yet. Tracked in Phase 3.

---

## Phase 1 — Stabilize the Existing MVP — 🔲 Not started

**Goal**: make the current Express/CRA app actually work end-to-end before any framework migration.

Planned:
- [ ] Wire up real JWT issuance + httpOnly cookie in `server/routes/loginRoute.js` (currently commented out).
- [ ] Strip `password`/`verifyOtp` from API responses (`select: false` in `server/assets/models/userModel.js`).
- [ ] Fix `server/routes/logoutRoute.js` (calls undefined `clearCookie`, throws at runtime).
- [ ] Fix `/forgotpassword` (`server/routes/forgotPassword.js`) to require a verified reset token/OTP instead of resetting on email alone.
- [ ] Resolve `/order` vs `/sales` model confusion in `server/routes/orderRoute.js` (writes/reads currently hit `SalesModel`, not `OrderModel`).
- [ ] Fix schema typos (`requied` → `required`) across `server/assets/models/*.js`.
- [ ] Add minimal auth-check middleware and apply it to `/user`, `/purchases`, `/sales`, `/order`.

**Verification plan**: manually exercise signup → verify → login → protected route access → logout → forgot-password against a local server; confirm no route returns a password hash.

---

## Phase 2 — Foundation Modernization — 🔲 Not started

- [ ] Backend: migrate flat Express app → NestJS + TypeScript (modules/controllers/services/DTOs, guards, class-validator, auto OpenAPI). Keep MongoDB/Mongoose via `@nestjs/mongoose`; add transactions for multi-document writes.
- [ ] Frontend: migrate CRA → Vite + React + TypeScript. Replace ~15 files' worth of ad-hoc `axios` calls with one typed API client. Introduce TanStack Query for server state.
- [ ] Tooling: ESLint + Prettier (backend currently has none), Husky + lint-staged, root-level workspace tooling (pnpm workspaces / Turborepo).
- [ ] API versioning (`/api/v1/...`).

---

## Phase 3 — Security & Auth Hardening — 🔲 Not started

- [ ] JWT access + refresh token flow, httpOnly secure cookies, token rotation.
- [ ] RBAC via server-side guards (replacing client-side-only `sessionStorage` role flags).
- [ ] Input validation (class-validator DTOs) on every endpoint.
- [ ] Rate limiting on auth endpoints (signup/login/OTP-verify/forgot-password).
- [ ] `helmet` + explicit per-environment CORS allowlist.
- [ ] Swap Mailtrap sandbox for a real transactional email provider; add OTP expiry.
- [ ] Centralized exception handling (stop leaking raw DB errors to clients).

---

## Phase 4 — Testing & Quality — 🔲 Not started

- [ ] Backend: Jest + Supertest per module.
- [ ] Frontend: Vitest + React Testing Library (replacing the stale CRA boilerplate test).
- [ ] E2E: Playwright for core flows.
- [ ] Wire test execution into CI as a merge gate.

---

## Phase 5 — DevOps & Infrastructure — 🔲 Not started

- [ ] Dockerfiles (backend + frontend) + `docker-compose.yml` for local dev.
- [ ] GitHub Actions CI/CD (lint → typecheck → test → build → deploy).
- [ ] Real local/staging/production environment separation.
- [ ] Reassess Vercel serverless for the backend; consider a container-friendly host (Render/Railway/Fly.io/AWS ECS) for scale.
- [ ] Database backup strategy + migration/seeding tooling.

---

## Phase 6 — Observability & Operations — 🔲 Not started

- [ ] Structured logging (`pino`), removing plaintext password logging in signup/login.
- [ ] Error tracking (Sentry) on both ends.
- [ ] Health-check endpoint(s).
- [ ] Basic metrics/dashboards.
- [ ] Audit logging for sensitive actions (role changes, deletions, password resets).

---

## Phase 7 — API & Documentation — 🔲 Not started

- [ ] OpenAPI/Swagger spec (auto-generated from NestJS).
- [ ] Expand `README.md` into real setup/run/deploy docs.
- [ ] Architecture overview + ADRs for key decisions made during this rebuild.

---

## Phase 8 — Scale & Investor-Facing Polish — 🔲 Not started (pursue only once 0–7 are solid)

- [ ] Redis caching for hot read paths.
- [ ] CDN for frontend static assets.
- [ ] Load testing (k6/Artillery).
- [ ] Feature flags.
- [ ] Formal security review / pen test before a real investor-facing launch.

---

## Key decisions & trade-offs

- **Git history**: not rewritten (Phase 0) — solo developer, accepted risk, mitigated by full credential rotation.
- **MongoDB vs. Postgres**: staying on MongoDB to avoid doubling the Phase 2 rewrite scope; Mongoose transactions cover the immediate consistency gap (e.g. a sale decrementing inventory). Postgres remains an option if transactional integrity issues surface later.
- **NestJS vs. plain Express+TypeScript**: NestJS chosen as the more standard "enterprise Node" structure (DI, guards, DTOs, OpenAPI built in), given the stated high-scale/investor-facing direction. Plain Express+TS remains a fallback if NestJS's structure proves more than needed solo.
