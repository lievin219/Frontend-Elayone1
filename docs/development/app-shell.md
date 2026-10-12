# App shell and navigation

## Source file

`frontend/src/App.tsx` and `frontend/src/features/app/`

## Responsibilities

The entry point chooses sign-in or authenticated routing. Focused hooks in
`features/app/` manage sessions, shared ministry data, dashboard state,
navigation, and notifications. `AppPageContent.tsx` selects the active screen
and wires its data/actions. Desktop uses a sidebar; narrow screens use bottom
navigation. Notifications are a panel over the selected tab.

## Where to edit

- Navigation order and role visibility: `useApplicationState.ts`.
- Initial session behavior and expiration: `useSessionState.ts`.
- Shared API data requests and error/retry state: `useMinistryData.ts` and
  `loadMinistryData.ts`.
- Screen selection and prop wiring: `AppPageContent.tsx`.
- Authenticated layout and responsive navigation: `AuthenticatedApp.tsx`,
  `AppNavigation.tsx`, and the navigation components.
- Shared theme/layout tokens: `frontend/src/theme.ts` and
  `frontend/src/styles.css`.

Keep screen-specific presentation in that screen's feature/component file.
Keep shared data ownership in the app hooks when multiple screens need the
same data.

## Verify a change

Test signed-out, member, leader, and administrator navigation, plus desktop and
mobile widths. Confirm session restore, sign-out, and the data-load retry path.
