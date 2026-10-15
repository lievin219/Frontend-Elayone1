# Elayone frontend

This repository contains the React + TypeScript frontend. It does **not** include
the backend API. The app needs a separately running or deployed API; cloning and
starting this frontend alone will not start a server on port 4000.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to the API's base URL.
	The default `http://localhost:4000` works only when the API is running on the
	same computer as the browser. For a remote API, use its reachable URL (for
	example, `https://api.example.com`), not `localhost`.
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
