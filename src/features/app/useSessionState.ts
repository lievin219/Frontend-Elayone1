import { useEffect, useState } from 'react';
import {
  getSessionExpiry,
  getStoredSession,
  SESSION_EXPIRED_EVENT,
  Session,
  signOut,
} from '../../api';

export function useSessionState() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    getStoredSession().then(setSession).finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    const handleExpired = () => setSession(null);
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpired);
  }, []);

  useEffect(() => {
    if (!session) return;
    const expiresAt = getSessionExpiry(session);
    if (!expiresAt) return void signOut().then(() => setSession(null));
    let timeout: number;
    const checkExpiry = () => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) return void signOut().then(() => setSession(null));
      timeout = window.setTimeout(checkExpiry, Math.min(remaining, 2_147_483_647));
    };
    checkExpiry();
    return () => window.clearTimeout(timeout);
  }, [session]);

  function authenticate(nextSession: Session) {
    setSession(nextSession);
  }

  async function logout() {
    await signOut();
    setSession(null);
  }

  return { session, authReady, authenticate, logout };
}
