import type { RehearsalRecord } from '../../api';

type CalendarEvent = Pick<RehearsalRecord, 'id' | 'title' | 'startsAt' | 'endsAt' | 'location' | 'eventTypeName' | 'customEventType' | 'songs'>;

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type GoogleTokenClient = {
  requestAccessToken: (options: { prompt: string }) => void;
};

type GoogleIdentity = {
  accounts: {
    oauth2: {
      initTokenClient: (options: {
        client_id: string;
        scope: string;
        callback: (response: GoogleTokenResponse) => void;
        error_callback: (error: { type: string; message?: string }) => void;
      }) => GoogleTokenClient;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

const GOOGLE_SCRIPT_ID = 'google-identity-services';
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events.owned';

let scriptLoad: Promise<void> | null = null;
let accessToken: { value: string; expiresAt: number } | null = null;
let tokenRequest: Promise<string> | null = null;

export const isGoogleCalendarConfigured = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export function loadGoogleIdentity() {
  if (window.google) return Promise.resolve();
  if (scriptLoad) return scriptLoad;

  scriptLoad = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement('script');
    script.async = true;
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = GOOGLE_SCRIPT_ID;
    script.onload = () => {
      if (window.google) resolve();
      else reject(new Error('Google Identity Services loaded without its authorization API.'));
    };
    script.onerror = () => reject(new Error('Google Identity Services could not be loaded.'));
    if (!existingScript) document.head.appendChild(script);
  }).catch((error: unknown) => {
    scriptLoad = null;
    throw error;
  });

  return scriptLoad;
}

function getAccessToken() {
  if (accessToken && accessToken.expiresAt > Date.now() + 60_000) {
    return Promise.resolve(accessToken.value);
  }
  if (tokenRequest) return tokenRequest;

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return Promise.reject(new Error('Google Calendar is not configured. Set VITE_GOOGLE_CLIENT_ID and restart the frontend.'));
  }
  if (!window.google) {
    return Promise.reject(new Error('Google authorization is still loading. Please try again in a moment.'));
  }

  tokenRequest = new Promise<string>((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: CALENDAR_SCOPE,
      callback: (response) => {
        if (response.error || !response.access_token || !response.expires_in) {
          reject(new Error(response.error_description ?? response.error ?? 'Google did not authorize calendar access.'));
          return;
        }
        accessToken = {
          value: response.access_token,
          expiresAt: Date.now() + response.expires_in * 1000,
        };
        resolve(response.access_token);
      },
      error_callback: (error) => reject(new Error(error.message ?? `Google authorization failed (${error.type}).`)),
    });
    client.requestAccessToken({ prompt: '' });
  }).finally(() => {
    tokenRequest = null;
  });

  return tokenRequest;
}

export async function addEventToGoogleCalendar(event: CalendarEvent) {
  const token = await getAccessToken();
  const eventType = event.customEventType || event.eventTypeName;
  const description = [
    eventType ? `Event type: ${eventType}` : null,
    event.songs?.length ? `Setlist:\n${event.songs.map((song) => `- ${song.title}${song.key ? ` (${song.key})` : ''}`).join('\n')}` : null,
  ].filter((line): line is string => line !== null).join('\n\n');

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary: event.title,
      location: event.location,
      description,
      start: { dateTime: new Date(event.startsAt).toISOString() },
      end: { dateTime: new Date(event.endsAt).toISOString() },
      extendedProperties: { private: { elayoneEventId: event.id } },
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      accessToken = null;
      throw new Error('Google Calendar authorization expired. Please click Add to Google Calendar again to reconnect.');
    }
    const result = await response.json() as { error?: { message?: string } };
    throw new Error(result.error?.message ?? `Google Calendar could not add this event (HTTP ${response.status}).`);
  }
}
