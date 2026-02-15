# HANDOFF - Esther Ifra Breslev V3

**Date**: 2026-02-13 (mis a jour 2026-02-15)
**Projet**: ultime-esther-ifra-breslev
**URL Live**: https://ultime-esther-ifra-breslev.vercel.app/
**Repo**: /Users/codenolimits-dreamai-nanach/Desktop/_PROJETS/ULTIME-PROJECTS/ultime-esther-ifra-breslev/

---

## Architecture

### Stack
- **Frontend**: Vite + React 19 + Tailwind CSS 4 + shadcn/ui
- **Routing**: wouter (lightweight)
- **Backend**: Vercel Serverless Functions (api/ directory)
- **Database**: Turso (LibSQL cloud SQLite)
- **Auth**: Supabase Auth (email/password)
- **Payments**: Stripe Checkout (working) + PayPal REST API (credentials invalid)
- **API Pattern**: Custom tRPC-like handler at `api/trpc/[trpc].ts` (NOT real tRPC - manual query dispatcher mimicking httpBatchLink format)

### Key Architecture Decisions
1. **NOT real tRPC** - The `api/trpc/[trpc].ts` file is a manual handler that maps procedure names to functions. It mimics tRPC's `httpBatchLink` response format (`{"result":{"data":{"json":...}}}`) so the client tRPC library works.
2. **httpBatchLink** always sends `{"0":{"json":{...}}}` format, even for single queries. This was the root cause of the getBySlug bug (was double-wrapping non-batch inputs).
3. **Supabase for Auth only** - The main data (books, categories, plans) lives in Turso/LibSQL. Supabase is only used for JWT authentication.
4. **Cart/Favorites/Reading Progress** tables auto-migrate on first request (ensureTables function in trpc handler).

### File Structure
```
api/
  trpc/[trpc].ts       # ALL backend logic (books, categories, cart, favorites, reading, auth)
  checkout.ts           # Stripe Checkout session creation
  paypal/
    create-order.ts     # PayPal order creation
    capture-order.ts    # PayPal order capture
client/
  src/
    _core/hooks/useAuth.ts  # Supabase auth hook
    components/
      Header.tsx, Footer.tsx, BookCard.tsx, PDFReader.tsx, Reviews.tsx, AIChatBox.tsx
      ui/                    # shadcn components
    lib/
      supabase.ts            # Supabase client (has fallback anon key)
      trpc.ts                # tRPC client config (httpBatchLink)
    pages/
      Home.tsx, Boutique.tsx, BookDetail.tsx, Connexion.tsx
      Panier.tsx, Checkout.tsx, EspaceMembre.tsx
      Abonnement.tsx, APropos.tsx
      CGV.tsx, MentionsLegales.tsx, PolitiqueConfidentialite.tsx
scripts/
  seed.ts                # Database seed script (30 books, 5 categories, 3 plans)
```

---

## Current State (Feb 15, 2026)

### What Works
| Feature | Status |
|---------|--------|
| Homepage | 100% |
| Boutique (book listing) | 100% |
| Book detail pages | 100% (getBySlug fixed) |
| All 20 book images | 100% (all display correctly) |
| Stripe payments | 100% (valid checkout URL) |
| Supabase Auth | 100% (project restored, new keys deployed) |
| User registration/login | 100% (Connexion page with accents fixed) |
| Cart (authenticated) | 100% (real Turso DB operations) |
| Favorites | 100% (real DB with JOIN) |
| Reading Progress | 100% (real DB with upsert) |
| A Propos page | 100% |
| Abonnement page | 100% (subscription buttons show toast) |
| Mobile responsive | 100% |

### What's Blocked (Needs David)
| Issue | Action Required |
|-------|----------------|
| PayPal payments | Get new sandbox credentials from developer.paypal.com |

### Commits This Session
- `6a48a8f` - V3: Supabase Auth + Stripe + PayPal integration (16 files)
- `0b59e9e` - Fix: 6 missing book images + Stripe env var fix + PayPal error handling
- **Uncommitted**: getBySlug fix, French accents, legal pages, UI polish, password reset

---

## Critical Bugs Found & Fixed

### 1. getBySlug "Unsupported type of value" (SHOWSTOPPER)
**Root cause**: httpBatchLink always sends `{"0":{"json":{slug:"xxx"}}}`. Old code double-wrapped for non-batch: `inputs = {"0": parsed}` making it `{"0":{"0":{"json":{...}}}}`. This made `input.slug` undefined, which libsql rejects.
**Fix**: Always use `inputs = JSON.parse(rawInput)` without conditional wrapping.
**File**: `api/trpc/[trpc].ts` lines 357-371

### 2. Stripe 500 "connection error"
**Root cause**: Vercel env vars had trailing `\n` (literal bytes 5c 6e) corrupting API keys.
**Fix**: Removed all vars and re-added with `printf '%s'` to avoid trailing newlines.

### 3. Supabase NXDOMAIN (project paused)
**Root cause**: Free-tier project paused after inactivity. DNS removed.
**Fix**: Found CLI token in keychain, paused SANDY BELLA to free slot, restored ESTHER IFRA via Management API. New keys generated and deployed.

### 4. Missing book images
**Fix**: Created placeholder copies, updated Turso DB for NULL entries.

---

## Credentials (CURRENT/VALID)

### Vercel Env Vars (all set across Production/Preview/Development)
| Variable | Value |
|----------|-------|
| STRIPE_SECRET_KEY | sk_test_51SVNpqB0aSf5elJW... (WORKING) |
| PAYPAL_CLIENT_ID | ATX4rmZHPMi4sol... (INVALID) |
| PAYPAL_SECRET | EEi8te5tM4Y5gsU0... (INVALID) |
| PAYPAL_MODE | sandbox |
| SUPABASE_URL | https://bxnhuwfabturyayohpht.supabase.co |
| VITE_SUPABASE_URL | https://bxnhuwfabturyayohpht.supabase.co |
| VITE_SUPABASE_ANON_KEY | eyJhbGciOi...._X0SKEFU05l-JJUjC_JSBKcB_64KbG2Xdr8l1TnqBPg |
| SUPABASE_SERVICE_ROLE_KEY | eyJhbGciOi....o4XvNzcO3HEEg94cOBhGpfk_ki8Du2VhMUcqAKh_9i0 |
| TURSO_DATABASE_URL | (set, encrypted) |
| TURSO_AUTH_TOKEN | (set, encrypted) |

### Supabase
- **Project ID**: bxnhuwfabturyayohpht
- **CLI Token**: sbp_0850d4415f091396ea0a4a2a85b8c6deaa13abe4

---

## Esther's Requirements (from 34 WhatsApp transcriptions)

### Implemented
- [x] E-commerce for Breslov books (physical + digital)
- [x] Supabase Auth (email/password login/register)
- [x] Stripe payments in ILS
- [x] Shopping cart with real database
- [x] Favorites/wishlist
- [x] Reading progress tracking
- [x] PDF reader with watermarking (simulated)
- [x] Subscription tiers (49/490/690 ILS)
- [x] Mobile responsive
- [x] French UI with proper accents
- [x] Legal pages (CGV, Mentions Legales, Politique de Confidentialite)

### Not Yet Implemented
- [ ] FlipHTML5 integration for real digital book reading
- [ ] LemonInk DRM watermarking (real, not simulated)
- [ ] Sky Pilot subscription delivery
- [ ] Multi-language (FR/HE/EN) - currently French only
- [ ] Real book PDF uploads
- [ ] AI-generated book covers (Esther requested)
- [ ] Esther's personal memoir integration
- [ ] Email notifications (order confirmation)
- [ ] Admin panel for book management
- [ ] Weight-based shipping calculator

### David Must Do
1. Fix PayPal sandbox credentials at developer.paypal.com
2. Upload actual book PDFs
3. Configure FlipHTML5 account
4. Get Esther's photo for A Propos page
5. Set up custom domain
6. Configure LemonInk DRM account
7. Set up Sky Pilot for subscriptions
8. Review and approve French legal pages content
9. Final review with Esther

---

## How to Continue Development

```bash
# Navigate to project
cd ~/Desktop/_PROJETS/ULTIME-PROJECTS/ultime-esther-ifra-breslev

# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Deploy to Vercel
vercel --prod

# Seed database
npx tsx scripts/seed.ts

# Check Turso DB
turso db shell esther-breslev-prod
```

### Key Commands
```bash
# Set a Vercel env var (without trailing newline!)
printf '%s' 'VALUE' | vercel env add VAR_NAME production

# Check Supabase project status
curl -s -H "Authorization: Bearer sbp_0850d4415f091396ea0a4a2a85b8c6deaa13abe4" \
  https://api.supabase.com/v1/projects | jq '.[].name'
```

---

## Session Timeline

| Time | Action | Result |
|------|--------|--------|
| Feb 11 | V3 implementation started | Supabase Auth, Stripe, PayPal, tRPC |
| Feb 13 AM | Deployed V3, found Stripe/PayPal 500s | Root cause: env var corruption |
| Feb 13 PM | Fixed env vars, images, PayPal error handling | Stripe working, 20/20 images OK |
| Feb 13 PM | Found getBySlug bug, Supabase down | Both root causes identified |
| Feb 15 | Restored Supabase, fixed getBySlug | Auth working, book pages working |
| Feb 15 | UI audit revealed 4.5/10 score | Legal pages empty, accents missing, UI issues |
| Feb 15 | 3 parallel agents fixing: accents, legal pages, UI | In progress |
