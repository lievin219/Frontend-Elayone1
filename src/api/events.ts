import { authHeaders, request } from './client';
import type { AttendanceResponseStatus, EventType } from './types';

export type EventSongRecord = { id: string; title: string; key: string | null; status: string; sortOrder?: number };
export type AttendanceSummary = { total: number; confirmed: number; rate: number; upcoming: number };

export type RehearsalRecord = {
  id: string;
  title: string;
  eventType?: EventType;
  customEventType?: string | null;
  eventTypeName?: string;
  recurrenceFrequency?: 'NONE' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  recurrenceIndex?: number;
  recurrenceTotal?: number;
  location: string;
  startsAt: string;
  endsAt: string;
  invitationOnly?: boolean;
  invited?: boolean;
  myStatus?: AttendanceResponseStatus;
  confirmedCount?: number;
  songs?: EventSongRecord[];
  invitees?: Array<{ userId: string; name: string; status: AttendanceResponseStatus }>;
  attendances?: Array<{ id: string; status: 'YES' | 'MAYBE' | 'NO' | 'PENDING'; userId: string }>;
};

export async function getAttendanceSummary(choirId: string): Promise<AttendanceSummary> {
  return request<AttendanceSummary>(`/api/choirs/${choirId}/attendance/summary`, { headers: await authHeaders() });
}

export async function getRehearsals(choirId: string): Promise<RehearsalRecord[]> {
  return request<RehearsalRecord[]>(`/api/choirs/${choirId}/rehearsals`, { headers: await authHeaders() });
}

export async function createRehearsal(choirId: string, data: {
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  eventType?: EventType;
  customEventType?: string;
  recurrenceFrequency?: 'NONE' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  recurrenceCount?: number;
  inviteeIds?: string[];
  songIds?: string[];
}) {
  return request<RehearsalRecord>(`/api/choirs/${choirId}/rehearsals`, { method: 'POST', headers: await authHeaders(), body: JSON.stringify(data) });
}

export async function updateRehearsalSongs(choirId: string, rehearsalId: string, songIds: string[]): Promise<EventSongRecord[]> {
  const result = await request<{ songs: EventSongRecord[] }>(`/api/choirs/${choirId}/rehearsals/${rehearsalId}/songs`, {
    method: 'PUT',
    headers: await authHeaders(),
    body: JSON.stringify({ songIds }),
  });
  return result.songs;
}

export async function updateAttendance(choirId: string, rehearsalId: string, status: AttendanceResponseStatus) {
  return request<{ id?: string; rehearsalId: string; userId: string; status: AttendanceResponseStatus }>(`/api/choirs/${choirId}/rehearsals/${rehearsalId}/attendance`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
  });
}
