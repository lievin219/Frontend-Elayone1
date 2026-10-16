import { Alert } from '../../components/WebUI';
import { createSong } from '../../api';
import type { SongItem } from '../../types';
import type { BusyState, NoticeSetter } from './adminTypes';

const choirId = 'elayone-main-choir';
type Input = { title: string; key: string; previewUrl: string; media: File | null; status: 'READY' | 'LEARN'; notes: string; setNotice: NoticeSetter; setBusy: BusyState[1]; onAdded: (song: SongItem) => void; clear: () => void };

export async function saveMinistrySong(input: Input) {
  const { title, key, previewUrl, media, status, notes, setNotice, setBusy, onAdded, clear } = input;
  if (!title.trim()) return setNotice({ type: 'error', text: 'Add a song title before saving it.' });
  if (!media && previewUrl.trim()) {
    try { new URL(previewUrl.trim()); }
    catch { return setNotice({ type: 'error', text: 'Enter a valid preview URL, or leave it empty.' }); }
  }
  setBusy(true); setNotice(null);
  try {
    const created = await createSong(choirId, { title: title.trim(), key: key.trim() || undefined, status, previewUrl: media ? undefined : previewUrl.trim() || undefined, notes: notes.trim() || undefined, media: media ?? undefined });
    onAdded({ ...created, key: created.key ?? (key.trim() || null), status: created.status ?? status, notes: created.notes ?? null, previewUrl: created.previewUrl ?? (previewUrl.trim() || null), icon: created.status === 'LEARN' ? 'book-outline' : 'musical-notes-outline' });
    clear(); setNotice({ type: 'success', text: 'Song saved successfully and added to the library.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save the song right now.';
    setNotice({ type: 'error', text: message }); Alert.alert('Could not save song', message);
  } finally { setBusy(false); }
}
