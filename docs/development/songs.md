# Song library

## Source files

- Song library tab and playback: `frontend/src/features/SongLibrary.tsx`
- Admin song forms: `frontend/src/features/Admin.tsx`
- Song API client: `frontend/src/api.ts`
- Server song routes: `server/src/routes/choir.ts`

## What this page does

The Songs tab lists songs fetched for the ministry, supports text search, and plays
a preview when a song has a preview URL. Up to two different song previews can play at
the same time; each row has its own play/pause control, and the library shows
how many previews are playing. Administrators and leaders add songs
and media from Admin; server authorization determines whether the operation is
permitted.

## How to edit it

- Search, featured song, and playback UI: `SongLibrary` in `SongLibrary.tsx`.
- Song fields and upload controls: song-management section in `Admin.tsx`.
- Request types and upload encoding: song functions in `api.ts`.
- Stored fields and validation: song handlers in `server/src/routes/choir.ts`
  and the `Song` model in `server/prisma/schema.prisma`.

## Verify a change

Test search, a song with a preview URL, a song without a preview URL, and
authorized song creation/deletion. Confirm new data is returned after reload.
