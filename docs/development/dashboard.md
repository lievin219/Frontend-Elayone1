# Home dashboard: how to edit it

## Open the dashboard

Start the backend and frontend, open `http://localhost:5173`, and sign in. The
first authenticated screen is Home. There is no separate dashboard URL; the
screen is selected by the Home navigation item.

## The file to edit

The dashboard's screen markup is in
`frontend/src/features/HomeDashboard.tsx`. It is a standalone component and
has been formatted into clearly separated JSX sections. You do not need to
edit the sign-in page or Admin screen to change the dashboard's layout.

Dashboard values are derived in
`frontend/src/features/app/useDashboardState.ts` and passed to the feature
screen by `frontend/src/features/app/AppPageContent.tsx`. Shared ministry data
is loaded by `useMinistryData.ts` and `loadMinistryData.ts`.

## Dashboard sections

The component is arranged in this order:

1. **Hero and welcome** — gospel motif, welcome name, date/time, Isaiah verse.
2. **Next gathering card** — event title/type, song setlist, time, location,
   attendance count, and a link to the event calendar.
3. **This week metrics** — upcoming events, attendance rate, and library size.
4. **Quick access** — shortcuts to Calendar, Songs, Profile, and the
   role-appropriate updates action.

Search for the section's visible heading or its JSX comment in
`HomeDashboard.tsx` to find the area to change.

## Where each value comes from

| Dashboard content | Prop | Set or calculated in |
| --- | --- | --- |
| Welcome name | `welcomeName` | `useApplicationState.ts`, from the signed-in user's name |
| Current date and time | `formattedDate`, `formattedTime` | `useDashboardState.ts`, updated from the current clock |
| Scripture | `dailyVerse` | `AppPageContent.tsx` (currently Isaiah 40:31 KJV; the sign-in verse is separate in `AuthScreen.tsx`) |
| Next/active gathering and songs | `nextRehearsal`, `eventTypeLabel`, `liveEventLabel`, `liveEventState`, `nextRehearsalParts` | `useDashboardState.ts`, calculated from loaded events |
| Attendance totals | `attendanceSummary` | Loaded by `useMinistryData.ts` and composed in `AppPageContent.tsx` |
| Upcoming count | `upcomingRehearsalCount` | Calculated in `useDashboardState.ts` |
| Song-library count | `songs` | Loaded by `useMinistryData.ts` and passed in `AppPageContent.tsx` |
| Compact-screen layout | `isCompact` | `AppPageContent.tsx`, based on viewport width |
| Latest ministry update | `announcements` | Loaded and refreshed every minute by `useMinistryData.ts` |
| Dashboard freshness | `lastUpdated`, `isRefreshing` | Updated by `useMinistryData.ts` after API requests finish |

To change content or layout, work in `HomeDashboard.tsx`. To change the source or calculation for one of the values above, follow it to
the app hook named above and then to the relevant function in
`frontend/src/api.ts`.

## Change the design

- Edit section markup and order in `HomeDashboard.tsx`.
- Adjust existing dashboard style objects (for example `hero`,
  `nextRehearsalCard`, `weekGrid`, `quickGrid`) in `frontend/src/theme.ts`.
- Adjust dashboard-specific responsive or decorative CSS in
  `frontend/src/styles.css`. The authenticated app's faint, full-screen cross
  backdrop and music-note artwork are drawn with CSS
  (`.ministry-ambient::before` and `.ministry-music-art`), not icon assets.
- Use the existing `Box`, `Label`, `ActionButton`, and `Icon` UI primitives
  from `frontend/src/components/WebUI.tsx`.

Avoid putting database requests in the dashboard component: shared dashboard
data is loaded by `useMinistryData.ts`, so other screens can stay in sync.

The dashboard Refresh control reloads the ministry data; new announcements
and reminders are checked every minute. Administrators and ministry leaders can
use Send update to jump to the announcement composer in Admin. Members see
View updates instead.

## Verify a change

Run `npm run frontend:typecheck` and `npm run frontend:build`. Then sign in and
check the desktop and narrow/mobile layouts in the browser.
