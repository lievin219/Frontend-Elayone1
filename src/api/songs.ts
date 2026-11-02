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

export async function createSongUpload(choirId: string, media: File): Promise<{ path: string; signedUrl: string; publicUrl: string }> {
  return request<{ path: string; signedUrl: string; publicUrl: string }>(`/api/choirs/${choirId}/songs/upload-url`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ mimeType: media.type, fileName: media.name, fileSize: media.size }),
  });
}

export async function uploadSongDirectly(choirId: string, media: File): Promise<string> {
  const upload = await createSongUpload(choirId, media);
  const response = await fetch(upload.signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': media.type,
      'Cache-Control': '3600',
      'x-upsert': 'false',
    },
    body: media,
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(detail || 'The song file could not be uploaded to cloud storage.');
  }
  return upload.publicUrl;
}

export async function deleteSong(choirId: string, songId: string): Promise<void> {
  return request<void>(`/api/choirs/${choirId}/songs/${songId}`, { method: 'DELETE', headers: await authHeaders() });
}
