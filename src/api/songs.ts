import { authHeaders, request } from './client';

export type SongRecord = {
  id: string;
  title: string;
  key: string | null;
  status: string;
  notes?: string | null;
  previewUrl?: string | null;
};

export async function getSongs(choirId: string): Promise<SongRecord[]> {
  return request<SongRecord[]>(`/api/choirs/${choirId}/songs`, { headers: await authHeaders() });
}

export async function createSong(choirId: string, data: { title: string; key?: string; status?: string; previewUrl?: string; notes?: string; media?: File }) {
  const headers = await authHeaders();
  if (data.media) {
    const form = new FormData();
    form.append('title', data.title);
    if (data.key) form.append('key', data.key);
    if (data.status) form.append('status', data.status);
    if (data.notes) form.append('notes', data.notes);
    form.append('media', data.media, data.media.name);
    return request<SongRecord>(`/api/choirs/${choirId}/songs`, { method: 'POST', headers, body: form });
  }
  return request<SongRecord>(`/api/choirs/${choirId}/songs`, { method: 'POST', headers, body: JSON.stringify(data) });
}

export async function deleteSong(choirId: string, songId: string): Promise<void> {
  return request<void>(`/api/choirs/${choirId}/songs/${songId}`, { method: 'DELETE', headers: await authHeaders() });
}
