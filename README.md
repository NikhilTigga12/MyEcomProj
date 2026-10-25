
## Requirements

- Node.js 18 or newer
- npm (bundled with Node)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Build for production

```bash
npm run build
```

The build script runs `tsc --noEmit` for type checking, then `vite build`. Output goes to `dist/`. Use `npm run preview` to check the production bundle locally.

## Project structure

```
src/
  assets/styles/app.css   Tailwind v4 theme tokens (brand palette, fonts, breakpoints)
  components/
    cart/                 CartDrawer (mini-cart)
    catalog/              CatalogView, FilterSidebar, SortDropdown, CategoryCard
    layout/               Navbar, Footer, StoreLayout
    product/              ProductCard
    ui/                   Badge, Breadcrumb, FormikField, Pagination, PriceTag,
                          QuantityStepper, RatingStars, Skeleton, ToastStack, ...
  data/                   products.ts, categories.ts, query.ts, types.ts (mock data)
  i18n/                   i18next setup and locales (pt-BR.json, en.json, es.json)
  lib/format.ts           currency and date formatting helpers
  pages/                  route pages, plus account/ subpages
  stores/                 Zustand stores: auth, cart, orders, ui, wishlist
  App.tsx                 route table with lazy loading and auth guard
  main.tsx                entry point
```

## Theming and customization

Tailwind CSS v4 is configured in CSS, not in a JavaScript config file. All design tokens live in `src/assets/styles/app.css` inside the `@theme` block: the brand color scale (`--color-brand-25` to `--color-brand-950`, base color `#465fff`), the gray scale, title sizes, the Outfit font and extra breakpoints (`2xsm`, `xsm`, `3xl`). Change a token there and every utility class that uses it follows.

Dark mode is class-based (`@custom-variant dark`). The `ui` store toggles the `.dark` class on the root element and persists the choice.

### Wiring a real API

All content comes from `src/data/`. `products.ts` has 24 products across the 6 categories defined in `categories.ts`, each with price, stock, variations, rating and generated reviews. `query.ts` holds the filter and sort helpers used by the catalog. To connect a backend, replace the imports from `src/data/` with API calls and keep the interfaces in `src/data/types.ts` as the contract. The Zustand stores (`cart`, `orders`, `wishlist`, `auth`) are plain stores, so API calls can be added action by action.

### Internationalization

Interface strings live in `src/i18n/locales/` (pt-BR, en, es). The active language is detected from the browser and can be changed at runtime with the language switcher in the navbar. Route paths and mock content are in Portuguese.

### PWA

`vite-plugin-pwa` generates a service worker (auto update) and a web manifest, so the production build is installable. Icons are in `public/`.

## Other stacks

This storefront is part of a template catalog where each vertical exists in several stacks (HTML, React, Vue 3, Angular, Laravel). The other e-commerce versions and the other verticals are listed at https://template.dev.br.

## Support this project

This template is free to use. If it saved you some time, you can support the project with a donation at https://template.dev.br/doar?template=ecommerce-react.

## License

MIT. See [LICENSE](./LICENSE).
