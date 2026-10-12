# Attendance reports

## Source files

- Report page and filters: `frontend/src/features/AttendanceReports.tsx`
- API client and result types: `frontend/src/api.ts`
- Report aggregation and access policy: `server/src/routes/choir.ts`

## What this page does

The page loads event attendance, response totals, member history, and
response-rate metrics. Administrators and leaders see ministry-wide information.
Members see their own attendance history. Search and pending-response filters
are client-side views of the report data returned by the server.

## How to edit it

- Page loading/error state and layout: `AttendanceReportScreen`.
- Metrics, event rows, history rows, and empty states: helper components in
  `AttendanceReports.tsx`.
- API response structure: `AttendanceReport` type and `getAttendanceReport` in
  `api.ts`.
- Aggregation and authorization: attendance report route in
  `server/src/routes/choir.ts`.

## Verify a change

Test loading, error/retry, empty data, admin/leader results, member-only
results, search, and the pending-response filter.
