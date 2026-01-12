#  Figma Replacement (React + TypeScript + Vite)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
**# Manifest-Driven UI POC (Figma Replacement)*

This repository contains a **proof-of-concept** for a manifest-driven UI renderer intended as a lightweight alternative to Figma for internal product design and iteration.

The goal is **not** to replace engineering, but to let Product Owners and Analysts describe repeatable UI layouts in a structured, version-controlled way that renders pixel-consistently using the existing design system.

---

## What this is

- A **read-only UI renderer**
- Driven by a **JSON manifest**
- Built with **React + Chakra (v3)** primitives
- Designed for **desktop internal tooling**
- Optimised for **highly repetitive enterprise screens**

Typical use cases:
- Case / workbench screens
- Search + results layouts
- Tabbed views with accordion detail sections
- Internal admin / ops tooling

---

## What this is not

- ❌ A visual drag-and-drop builder
- ❌ A replacement for runtime UI logic
- ❌ A form engine (yet)
- ❌ A design system itself

This POC deliberately avoids:
- complex state management
- data fetching
- validation logic
- accessibility hardening

Those concerns belong in later phases.

---

## Why this exists

In many internal applications:
- Screens are **structurally identical**
- Only labels, columns, and sections change
- Figma designs quickly drift from implementation
- Iteration requires hand-offs and rework

This POC explores whether a **manifest → UI** approach can:
- eliminate the Figma → dev translation step
- keep layout definitions close to code
- allow rapid iteration via pull requests
- reuse the same renderer across multiple projects

---

## Architecture (POC level)


```
