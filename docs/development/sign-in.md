# Sign-in page

## Source file

- Screen: `frontend/src/features/AuthScreen.tsx`
- Login request/session storage: `frontend/src/api.ts`
- Show sign-in versus signed-in app: `frontend/src/App.tsx`
- Session restore and expiration: `frontend/src/features/app/useSessionState.ts`
- Screen styles: `frontend/src/theme.ts` and `frontend/src/styles.css`

## What the page does

The visitor enters an email and password. The sign-in form calls `signIn`.
When the API accepts the credentials, the app stores the returned session and
shows Home. When the API rejects them, the form displays the returned error.
Public signup is disabled; administrators create member accounts in Admin.

The decorative gospel welcome panel, Isaiah 43:19 verse, logo, and form fields
are presentation in `AuthScreen.tsx`. Authentication rules and password checks
belong to the server and must not be replaced by frontend-only validation.

## How to edit it

- Change the heading, verse, logo, form order, or help copy in
  `AuthScreen.tsx`.
- Change the appearance through the `auth*` style entries in `theme.ts` and
  `.auth-*` rules in `styles.css`.
- Change request behavior in `api.ts` and `server/src/routes/auth.ts`.
- Change which screen appears after sign-in in `App.tsx` and
  `features/app/useNavigationState.ts`.

## Verify a change

Run `npm run frontend:typecheck` from the repository root, then test both a
successful sign-in and an incorrect password in the browser.
