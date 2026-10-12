# Frontend

This is a standard React + TypeScript web app built with Vite. It does not use Expo or React Native.

## Run locally

From the repository root:

```bash
npm install --prefix frontend
npm install --prefix server
npm start
```

The Vite development server prints its local URL (normally `http://localhost:5173`). The backend API should be running separately with `npm run server`.

Copy `.env.example` to `.env` if the API is not at `http://localhost:4000`, then set `VITE_API_URL`.

## Structure

- `src/main.tsx` — browser entry point.
- `src/App.tsx` — app entry and sign-in/authenticated routing.
- `src/features/app/` — session, ministry data, navigation, dashboard state, notifications, and shared app shell.
- `src/features/app/AppPageContent.tsx` — maps the active tab to its feature screen and wires screen actions.
- `src/features/` — authentication, home, calendar, reports, administration, and profile screens.
- `src/components/` — shared ministry views and browser UI primitives.
- `src/api.ts` — typed API client and browser session storage.
- `src/theme.ts` and `src/styles.css` — shared design tokens, styles, and responsive layout.

See the repository [developer guide](../DEVELOPMENT.md) for links to individual
screen/function guides. For the dashboard, start with the
[dashboard guide](../docs/development/dashboard.md) and
`src/features/HomeDashboard.tsx`.

Run `npm run build` in this directory to typecheck and create the production web bundle.
# Frontend-Elayone1
