# Shared UI and styling

## Source files

- Web UI primitives: `frontend/src/components/WebUI.tsx`
- Shared ministry components: `frontend/src/components/MinistryComponents.tsx`
- Style objects and color palette: `frontend/src/theme.ts`
- Global and responsive CSS: `frontend/src/styles.css`
- Shared visual and data types: `frontend/src/types.ts`

## Responsibilities

`WebUI.tsx` wraps browser elements in components used across screens, such as
`Box`, `Label`, `ActionButton`, `TextField`, and `Icon`. `MinistryComponents.tsx`
contains reusable form fields, admin form wrappers, quick actions, and the
notification panel. `theme.ts` centralizes style objects; `styles.css` handles
web-specific selectors and responsive behavior.

## How to edit

Change a shared primitive only when the behavior should change consistently
across the app. For a single-screen design change, first edit that screen's
style usage or add a screen-specific style; avoid changing a shared primitive
for a local visual adjustment.

## Verify a change

Check all screens that use a changed shared component, keyboard/focus behavior,
accessible labels, and narrow viewport layout. Run frontend typecheck/build.
