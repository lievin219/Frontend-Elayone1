# API and database data flow

## Request path

```text
Screen -> frontend/src/api.ts -> server/src/index.ts
       -> server/src/routes/* -> server/src/lib/prisma.ts
       -> server/prisma/schema.prisma -> PostgreSQL / Supabase
```

The browser sends requests to the Node API. The API owns database credentials,
verifies bearer sessions, applies role and membership access checks, and uses Prisma to
read or write PostgreSQL. Never expose database connection strings or service
secrets in frontend variables.

## Files

- Frontend request client and types: `frontend/src/api.ts`
- API setup, health route, CORS, shared errors: `server/src/index.ts`
- Token/role/membership authorization: `server/src/middleware/auth.ts`
- Login: `server/src/routes/auth.ts`
- Account management: `server/src/routes/users.ts`
- Ministry content and reports: `server/src/routes/choir.ts`
- Prisma client: `server/src/lib/prisma.ts`
- Database schema and migrations: `server/prisma/schema.prisma` and
  `server/prisma/migrations/`
- Environment variable names/examples: `server/.env.example`
- Deployment and API inventory: `server/README.md`
- Song upload storage integration: `server/src/lib/song-media.ts` and
  `server/src/routes/choir/songs.ts`

## Local development

This checkout contains the frontend only; the backend source and server scripts
described above are not included here. Start or deploy the API separately, then
set `VITE_API_URL` in the frontend `.env` to its base URL. The default is
`http://localhost:4000`, which is reachable only if the API is running on the
same computer as the browser. A remote browser/device needs a reachable API
hostname instead of `localhost`. The API must also allow the frontend origin
through CORS. Restart Vite after changing the frontend `.env`.

## Validation

```bash
npm run frontend:typecheck
npm run frontend:build
npm run server:typecheck
```

When changing data shape, update the Prisma schema/migration, server route,
frontend API type/function, and screen handling together. Test both a valid
request and an unauthorized/invalid request.

Memberships are assigned to Singers or Band. Existing memberships default to
Singers in the ministry-teams migration; administrators can change a member's
team from Admin.

Song metadata is persisted through Prisma in PostgreSQL. When an admin attaches
an MP3/MP4, the API uploads the file to the configured Supabase Storage bucket
and stores its public URL in the song record. The Supabase service-role key is
backend-only; do not add it to frontend environment variables. Local development
uses the `DATABASE_URL` in `server/.env` and `VITE_API_URL` in `frontend/.env`,
so both must point to hosted services when testing production data.
