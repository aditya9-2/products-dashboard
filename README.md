# Volt Admin — Product Dashboard

A product admin dashboard built on top of the [DummyJSON](https://dummyjson.com) API. Browse, search, filter, sort, and paginate a product catalog, then add, edit, and delete products.

## Features

- Search, category filter, and sort — all synced to the URL, so any view is a shareable link
- Pagination with adjustable page size
- Add, edit, and delete products
- Product detail page with an image gallery and customer reviews
- Session-local persistence layered over DummyJSON's non-persistent API

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React
- TypeScript
- Tailwind CSS
- Axios
- [Bun](https://bun.sh) as the package manager and runtime

## Running it locally

**Prerequisites:** [Bun](https://bun.sh) installed on your machine.

```bash
    # 1. Clone the repo
    git clone https://github.com/aditya9-2/products-dashboard.git
    cd product-dashboard

    # 2. Install dependencies
    bun install

    # 3. Start the dev server
    bun run dev
```

Open the printed URL in your browser (usually `http://localhost:3000` — check your terminal, since Next.js picks the next free port if 3000 is busy).

## Demo login

```
    Username: emilys
    Password: emilyspass
```

## Other commands

```bash
    bun run build   # production build
    bun run start   # run the production build locally
    bun run lint    # run ESLint
```
