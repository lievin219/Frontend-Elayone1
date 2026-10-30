# Elayone frontend

This repository contains the React + TypeScript frontend. It does **not** include
the backend API. The app needs a separately running or deployed API; cloning and
starting this frontend alone will not start a server on port 4000.

## Run locally

1. Install dependencies with `npm install`.
2. The frontend uses the deployed API at `https://backend-elayone.onrender.com` by default. To use a different API, create a local `.env.local` file in this folder and set:

   ```env
   VITE_API_URL=https://api.elayonemusic.org
   ```

	Replace the value only if your API has a different URL. `.env.local` is
	intentionally excluded from Git. Do not use `localhost` unless you have the API
	running on your own computer.
3. Start the frontend with `npm run start` and open the URL Vite prints (normally
	`http://localhost:5173`).

The API must allow browser requests from the frontend origin (CORS). If the API
is not available, sign-in and data-loading requests will show a connection
error. Restart Vite after changing `.env` because Vite reads environment
variables at startup. Never put database credentials or backend service keys in
this frontend's environment variables.

## Build

Run `npm run build` to typecheck and create the production web bundle. Set
`VITE_API_URL` in the frontend deployment environment to the public API URL
before building.

## Project guides

See [the developer guides](docs/development/) for API/data-flow and feature
documentation.
