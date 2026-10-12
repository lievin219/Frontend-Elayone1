import { useState } from 'react';
import type { SongItem } from '../../types';
import type { BusyState, NoticeSetter } from './adminTypes';
import { saveMinistrySong } from './saveMinistrySong';

export function useAdminSongForm(onAdded: (song: SongItem) => void, setNotice: NoticeSetter, setBusy: BusyState[1]) {
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [status, setStatus] = useState<'READY' | 'LEARN'>('READY');
  const [notes, setNotes] = useState('');
  const addSong = () => saveMinistrySong({ title, key, previewUrl, media, status, notes, setNotice, setBusy, onAdded, clear: () => {
    setTitle(''); setKey(''); setPreviewUrl(''); setMedia(null); setStatus('READY'); setNotes('');
  } });
  function setPreview(value: string) {
    setPreviewUrl(value);
    if (value.trim()) setMedia(null);
  }
  return { title, setTitle, key, setKey, previewUrl, setPreview, media, setMedia, status, setStatus, notes, setNotes, addSong };
}
