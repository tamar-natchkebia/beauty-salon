# Salon Booking App — README

A Next.js + Supabase frontend for a beauty salon in Tbilisi. Three main pages handle service browsing, appointment booking, and guest reviews.

---

## Tech Stack

- **Framework:** Next.js (App Router, `"use client"`)
- **Database & Storage:** Supabase (PostgreSQL + Storage buckets)
- **Styling:** Tailwind CSS with custom design tokens (`forest`, `cream`, `off-white`, `near-black`, `deep-green`)
- **Language:** TypeScript

---

## Pages

### `/services` — Treatment Menu (`AdvancedServicesPage`)
Browse all services with live filtering.

**Features:**
- Tab switcher by category (Skincare, Spa, Nails, Hair)
- Text search across name + description
- Concern/benefit filter dropdown (glow, hydration, exfoliation, tension, grooming)
- Max duration slider (30–90 min)
- Images pulled from Supabase Storage
- "Request Slot" links through to `/book`

**Data source:** Static `SERVICES_MENU` object (no DB fetch needed).

---

### `/book` — Book Appointment (`BookAppointment`)
Three-step booking wizard.

**Step 1 — Treatment:** Select a service from the grid.  
**Step 2 — Date & Time:** Date picker + time slot buttons (10:00–19:00).  
**Step 3 — Confirmation:** Client details form (name, email, phone, contact preference, notes).

**On submit:** Inserts a row into the `bookings` table with `status: "pending"`.

**Supabase table: `bookings`**
| Column | Type |
|---|---|
| `client_name` | text |
| `client_email` | text |
| `treatment` | text |
| `booking_date` | date |
| `booking_time` | text |
| `status` | text (`"pending"`) |

---

### `/standards` — Standards & Reviews (`StandardsAndReviews`)
Editorial page showing brand pillars + guest reviews with a submission form.

**Features:**
- Fetches only `is_approved = true` reviews on mount
- Like button increments `likes` column live
- Review form submits to `reviews` table (inserted without `is_approved`, pending admin moderation)
- 5-second success confirmation banner on submit

**Supabase table: `reviews`**
| Column | Type |
|---|---|
| `author` | text |
| `treatment` | text |
| `rating` | int (1–5) |
| `text` | text |
| `likes` | int |
| `is_approved` | bool (admin-set) |
| `created_at` | timestamp |

---

## Supabase Setup

**Project URL:** `https://senchgucwjsitagylknx.supabase.co`  
**Anon key:** stored inline in both page files — consider moving to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://senchgucwjsitagylknx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Then initialize the client from a shared utility:

```ts
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### RLS Policies needed

| Table | Operation | Policy |
|---|---|---|
| `bookings` | INSERT | Allow anon insert |
| `reviews` | SELECT | Allow anon select where `is_approved = true` |
| `reviews` | INSERT | Allow anon insert |
| `reviews` | UPDATE | Allow anon update `likes` column only |

---

## Storage

Service images are hosted in the `salon-images` Supabase Storage bucket and referenced by direct public URL in `SERVICES_MENU`.

---

## Project Structure

```
app/
├── book/
│   └── page.tsx          # BookAppointment — 3-step wizard
├── services/
│   └── page.tsx          # AdvancedServicesPage — treatment menu
├── standards/
│   └── page.tsx          # StandardsAndReviews — pillars + reviews
└── components/
    └── Navbar.tsx
```

---

## Local Dev

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.