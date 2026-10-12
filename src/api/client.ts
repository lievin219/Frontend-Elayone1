import type { Session } from './types';

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000').replace(/\/$/, '');
const SESSION_KEY = import.meta.env.VITE_SESSION_KEY ?? 'elayone-session';
export const SESSION_EXPIRED_EVENT = 'elayone:session-expired';

async function safeStorageGet(key: string): Promise<string | null> {
  return window.localStorage.getItem(key);
}

async function safeStorageSet(key: string, value: string): Promise<void> {
  window.localStorage.setItem(key, value);
}

async function safeStorageDelete(key: string): Promise<void> {
  window.localStorage.removeItem(key);
}

function tokenExpiresAt(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export async function getStoredSession(): Promise<Session | null> {
  const value = await safeStorageGet(SESSION_KEY);
  if (!value) return null;
  const session = JSON.parse(value) as Session;
  const expiresAt = tokenExpiresAt(session.token);
  if (!expiresAt || expiresAt <= Date.now()) {
    await signOut();
    return null;
  }
  return session;
}

export async function signOut(): Promise<void> {
  await safeStorageDelete(SESSION_KEY);
}

export function getSessionExpiry(session: Session): number | null {
  return tokenExpiresAt(session.token);
}

export async function authHeaders(): Promise<HeadersInit> {
  const session = await getStoredSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    const headers = new Headers(options.headers ?? {});
    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(`Cannot reach the server at ${API_URL}. Make sure the API is running and this browser can access it.`);
  }
  const body = await response.json().catch(() => ({}));
  if (response.status === 401 && new Headers(options.headers).has('Authorization')) {
    await signOut();
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }
  if (!response.ok) throw new Error(body.message ?? 'Something went wrong. Please try again.');
  return body as T;
}

export async function storeSession(session: Session): Promise<void> {
  await safeStorageSet(SESSION_KEY, JSON.stringify(session));
}
