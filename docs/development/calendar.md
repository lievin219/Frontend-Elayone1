# Calendar and events

## Source files

- Calendar screen, event form, day selection, RSVP, and setlists:
  `frontend/src/features/calendar/CalendarPage.tsx`
- Event validation and submission: `frontend/src/features/calendar/eventValidation.ts`
- Calendar and event UI components: `frontend/src/features/calendar/`
- Compatibility exports used by the app shell and Admin: `frontend/src/features/Calendar.tsx`
- Shared event/song data: `frontend/src/features/app/useMinistryData.ts`
- Calendar callbacks and feature wiring: `frontend/src/features/app/AppPageContent.tsx`
- Typed requests: `frontend/src/api.ts`
- Server routes and authorization: `server/src/routes/choir.ts`

## What this page does

Members browse a month, choose a date, see event details and music, and submit
YES/MAYBE/NO responses. Administrators and ministry leaders can create events,
select songs, and manage an event's setlist. The calendar refresh action reloads
events from the server.

## How to edit it

- Page composition and data flow: `CalendarPage.tsx`.
- Month navigation and event date helpers: `useCalendarNavigation.ts` and
  `calendarDateUtils.ts`.
- Event presentation: `CalendarEventCard.tsx`, `CalendarEventHeader.tsx`,
  `CalendarEventSongs.tsx`, and `EventAttendance.tsx`.
- Event form and field-level messages: `CalendarCreateEventForm.tsx`,
  `EventDetailsFields.tsx`, and `EventTypePicker.tsx`.
- Song picker and read-only setlist: `EventSongPicker.tsx` and
  `EventSongSetlist.tsx`.
- Shared event state and persistence callbacks: the Calendar branch in
  `features/app/AppPageContent.tsx`.
- Request payloads: event and attendance functions in `api.ts`.
- Validation, persistence, and role restrictions:
  `server/src/routes/choir.ts`.

## Verify a change

Test month navigation, an event with songs, a member RSVP, and event creation
with an authorized admin/leader. Confirm each required event field displays a
validation message when missing or invalid. Run frontend typecheck/build and
backend typecheck after changes that touch API payloads.
## Add events directly to Google Calendar

Each member can add an event to the primary calendar of a Google account they
choose. On first use, Google asks them to authorize Elayone. After approval,
the button creates the event through the Google Calendar API without opening
the Calendar event editor. The app does not use the Elayone account email as a
Google attendee address.

To enable this feature:

1. In Google Cloud Console, create a project, enable the Google Calendar API,
   and configure the OAuth consent screen with the app name and support email.
2. Create an OAuth client ID for a web application. Add each frontend origin
   to the client's **Authorized JavaScript
   origins** (for local development, `http://localhost:5173`).
3. If the consent screen is in testing mode, add each member's Google account
   as a test user.
4. Set `VITE_GOOGLE_CLIENT_ID` in `frontend/.env` to that client ID, then
   restart or rebuild the frontend.

The OAuth client ID is public browser configuration; never put a Google client
secret or user access token in frontend environment variables. Each member
must grant the `calendar.events.owned` permission for their own Google account.
