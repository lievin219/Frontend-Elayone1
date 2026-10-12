import { authHeaders, request } from './client';

export type AnnouncementRecord = {
  id: string;
  title: string;
  message: string;
  priority: 'NORMAL' | 'IMPORTANT';
  createdAt: string;
  author?: { name: string } | null;
};

export type ReminderRecord = {
  id: string;
  kind: 'EVENT' | 'RESPONSE';
  title: string;
  message: string;
  priority: 'NORMAL' | 'IMPORTANT';
  createdAt: string;
  eventId: string;
};

export async function getAnnouncements(choirId: string): Promise<AnnouncementRecord[]> {
  return request<AnnouncementRecord[]>(`/api/choirs/${choirId}/announcements`, { headers: await authHeaders() });
}

export async function publishAnnouncement(choirId: string, data: { title: string; message: string; priority: 'NORMAL' | 'IMPORTANT' }): Promise<AnnouncementRecord> {
  return request<AnnouncementRecord>(`/api/choirs/${choirId}/announcements`, { method: 'POST', headers: await authHeaders(), body: JSON.stringify(data) });
}

export async function deleteAnnouncement(choirId: string, announcementId: string) {
  return request<void>(`/api/choirs/${choirId}/announcements/${announcementId}`, { method: 'DELETE', headers: await authHeaders() });
}

export async function getReminders(choirId: string): Promise<ReminderRecord[]> {
  return request<ReminderRecord[]>(`/api/choirs/${choirId}/reminders`, { headers: await authHeaders() });
}
