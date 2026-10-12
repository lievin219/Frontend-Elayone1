import { authHeaders, request } from './client';
import type { AttendanceResponseStatus, EventType, MinistryTeam } from './types';

export type AttendanceReport = {
  scope: 'member' | 'choir';
  generatedAt: string;
  summary: { members: number; rehearsals: number; total: number; yes: number; maybe: number; no: number; pending: number; responseRate: number };
  events: Array<{
    id: string;
    title: string;
    eventType: EventType;
    startsAt: string;
    location: string;
    totals: { yes: number; maybe: number; no: number; pending: number };
    responses: Array<{ userId: string; name: string; status: AttendanceResponseStatus }>;
  }>;
  members: Array<{
    id: string;
    name: string;
    email?: string;
    ministryTeam: MinistryTeam;
    stats: { yes: number; maybe: number; no: number; pending: number; responseRate: number };
    events: Array<{ rehearsalId: string; title: string; eventType: EventType; startsAt: string; location: string; status: AttendanceResponseStatus }>;
  }>;
};

export async function getAttendanceReport(choirId: string): Promise<AttendanceReport> {
  return request<AttendanceReport>(`/api/choirs/${choirId}/attendance/report`, { headers: await authHeaders() });
}
