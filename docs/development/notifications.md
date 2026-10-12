# Notifications

## Source files

- Notification panel UI: `frontend/src/features/NotificationsPanel.tsx`
- Open/close and unread state: `frontend/src/features/app/useNotificationState.ts`
- Refresh behavior: `frontend/src/features/app/useMinistryData.ts`
- Announcement/reminder API client: `frontend/src/api.ts`
- Server routes: `server/src/routes/choir.ts`

## What this page does

The top-bar bell opens a panel containing announcements and reminders. The
app shell loads the initial data after sign-in and refreshes reminders
periodically while the session is active.

## How to edit it

- Card content and empty state: `NotificationsPanel`.
- Bell button and unread indicator: `features/app/AppTopBar.tsx`.
- Panel visibility and unread state: `features/app/useNotificationState.ts`.
- Refresh interval: `features/app/useMinistryData.ts`.
- Data structures and requests: announcement/reminder definitions and
  functions in `api.ts`.
- Persistence and visibility: announcement and reminder handlers in
  `server/src/routes/choir.ts`.

## Verify a change

Check no-notification, announcement-only, reminder-only, and mixed states.
Confirm opening the panel clears the unread indicator and closing it returns to
the previously selected screen.
