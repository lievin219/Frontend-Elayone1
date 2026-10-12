import { useEffect, useState } from 'react';
import type { Rehearsal } from '../../types';
import type { CalendarEventCardProps } from './calendarTypes';

export function useEventSetlist(event: Rehearsal, saveSongs: CalendarEventCardProps['onSaveSongs']) {
  const [editing, setEditing] = useState(false);
  const [songIds, setSongIds] = useState(() => event.songs?.map((song) => song.id) ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSongIds(event.songs?.map((song) => song.id) ?? []);
  }, [event.songs]);

  function cancel() {
    setEditing(false);
    setSongIds(event.songs?.map((song) => song.id) ?? []);
    setError('');
  }

  async function save() {
    setSaving(true);
    setError('');
    try {
      await saveSongs(event.id, songIds);
      setEditing(false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not save the event setlist.');
    } finally {
      setSaving(false);
    }
  }

  return { editing, setEditing, songIds, setSongIds, saving, error, setError, cancel, save };
}
