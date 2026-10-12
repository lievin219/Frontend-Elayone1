# Admin tools

## Source files

- Admin screen and event/song/announcement forms: `frontend/src/features/Admin.tsx`
- Account management UI and API state: `frontend/src/features/admin/MemberManagement.tsx`
- Shared form/field UI: `frontend/src/components/MinistryComponents.tsx`
- Typed requests: `frontend/src/api.ts`
- API authorization and handlers: `server/src/routes/users.ts`,
  `server/src/routes/choir.ts`, and `server/src/middleware/auth.ts`

## What this page does

The Admin tab groups account management, event creation, announcements, and
song management. It loads the user directory and sends each change to the API.
The server authorizes every operation; hiding a button in the UI alone is not
access control.

## Admin functionality

- **Members:** create accounts, assign Singers or Band, change roles, remove
  ministry membership, and reset passwords.
- **Events:** select type, date/time, recurrence, invitees, and songs.
- **Announcements:** publish an update with priority and delete an existing
  announcement.
- **Songs:** add title/key/status/notes/preview or media and remove a song.

## How to edit it

Account creation, directory loading, role changes, removals, and password
resets live in `MemberManagement.tsx`. Event, announcement, and song state and
submit handlers live in `AdminPanel` in `Admin.tsx`. Follow each typed API
function in `api.ts`; change the matching server route when request rules or
persisted behavior need to change.

## Verify a change

Test form validation, successful persistence after reload, duplicate or invalid
input, and role restrictions using both an authorized and unauthorized account.
