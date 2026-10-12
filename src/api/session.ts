import { request, storeSession } from './client';
import type { Session } from './types';

export async function signIn(email: string, password: string): Promise<Session> {
  const session = await request<Session>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  await storeSession(session);
  return session;
}

export async function signUp(name: string, email: string, password: string): Promise<Session> {
  const session = await request<Session>('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
  await storeSession(session);
  return session;
}
