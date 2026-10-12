# Member profile and passwords

## Source files

- Profile page: `frontend/src/features/Profile.tsx`
- Account and membership summary: `frontend/src/features/profile/ProfileOverview.tsx`
- Attendance section composition: `frontend/src/features/profile/ProfileAttendance.tsx`
- Attendance request state: `frontend/src/features/profile/useProfileAttendance.ts`
- Attendance loading/error and refresh states: `frontend/src/features/profile/ProfileAttendancePanel.tsx`
- Attendance metrics: `frontend/src/features/profile/ProfileAttendanceStats.tsx`
- Password form: `frontend/src/features/profile/ProfilePasswordForm.tsx`
- Typed password requests: `frontend/src/api.ts`
- Password routes: `server/src/index.ts` and `server/src/routes/users.ts`

## What this page does

The profile screen displays the member's account, ministry role, Singers/Band
team, availability, and attendance, and provides a password-change form. The
server verifies identity and password rules and stores only a password hash;
the actual password cannot be retrieved from the database.

## How to edit it

- Profile layout: the page and profile components above.
- Request wiring: `changeMyPassword` in `frontend/src/api.ts`.
- Validation and password hashing: corresponding handlers in the server files.

## Verify a change

Test a valid password change, too-short password, mismatched confirmation,
wrong current password, and the success/error notices. Never log or display a
submitted password.
