# Master Blueprint & Instruction File: Product Admin Dashboard

## 1. System Specifications & Strict Constraints
- **Runtime & Tooling:** Bun (`bun add`, `bun run dev`)
- **Framework:** Next.js (App Router, React 19, Next 16)
- **Styling:** Tailwind CSS v4 (configured via CSS `@theme` variables in `app/globals.css`, no `tailwind.config.ts`)
- **Path Resolution:** Root aliasing (`@/*` maps directly to `./*`)
- **Icons & HTTP:** `lucide-react`, `axios`
- **Zero Third-Party State/Query Libraries:** Strictly NO `@tanstack/react-query`, `swr`, `redux`, or `zustand`.
- **Zero Table/Pagination Wrappers:** Strictly NO `@tanstack/react-table` or UI pagination libraries. All debounce, pagination math, URL-search params sync, and modal flows must be handwritten custom logic.
- **Service Layer Separation:** Zero inline `axios` calls in UI components. All endpoints must reside in `/services/`.
- **URL as Single Source of Truth:** `page`, `limit`, `q`, `category`, `sortBy`, and `order` must reflect in search params.

---

## 2. Design System: Neo-Glass Precision
- **Theme Variables (Tailwind v4):**
  - Canvas Base: `--color-canvas: #0B0F28`
  - Elevated Container: `--color-primary: #1C2459`
  - Container Hover: `--color-primary-hover: #26327A`
  - Glass Surface: `--color-primary-glass: rgba(28, 36, 89, 0.45)`
  - Glass Hover: `--color-primary-glass-hover: rgba(28, 36, 89, 0.70)`
  - Electric Volt / Accent: `--color-accent: #F5FF67`
  - Accent Muted: `--color-accent-dim: rgba(245, 255, 103, 0.15)`
  - Destructive: `--color-danger: #FF4D4D`
- **Typography:** Sans-serif for body/labels; Tabular numerals (`font-mono`) for metrics, prices, and IDs.
- **Glass Elements:** Use `.glass-panel` and `.glass-panel-hover` with subtle 1px border (`border-white/10`) and backdrop blur.

---

## 3. Directory Layout (Flat Root)
```text
.
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   └── products/
├── hooks/
│   ├── useDebounce.ts
│   └── useProductFilters.ts
├── lib/
│   ├── axios.ts
│   └── utils.ts
├── services/
│   ├── authService.ts
│   └── productService.ts
└── types/
    ├── auth.ts
    └── product.ts
```    

## 4. Edge Cases & Functional Architecture
    1. Search Race Conditions: Use useDebounce (400ms) and abort previous pending requests using AbortController signal in Axios calls.

    2. API Dual-Filter Limitation: DummyJSON cannot search (/products/search?q=) and filter by category simultaneously. If search text is present, disable or ignore category with clear UI indication.

    3. Local Optimistic Mutation: DummyJSON does not save POST/PUT/DELETE calls on its live database. Retain additions, edits, and deletions in client memory / session state so they display immediately in the UI.

    4. Defensive Parsing: Fall back safely to page=1 if ?page=abc or negative values are entered. Constrain page sizes strictly to [10, 20, 50].

    5. Duplicate Prevention: Disable buttons while async submissions (isSubmitting) are active.