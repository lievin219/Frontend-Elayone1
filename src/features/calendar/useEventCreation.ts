import { useState } from 'react';
import { createRehearsal } from '../../api';
import type { RehearsalRecord } from '../../api';
import type { SongItem } from '../../types';
import type { CalendarNotice, EventDraft, EventFieldErrors } from './calendarTypes';
import { validateEventDraft } from './eventValidation';

const initialDraft = (): EventDraft => ({
  title: '',
  location: '',
  date: '',
  startTime: '',
  endTime: '',
  eventType: 'REHEARSAL',
  customEventType: '',
  songIds: [],
});

export function useEventCreation(songs: SongItem[], onCreated: (event: RehearsalRecord) => void, notify: (notice: CalendarNotice) => void) {
  const [draft, setDraft] = useState<EventDraft>(initialDraft);
  const [errors, setErrors] = useState<EventFieldErrors>({});
  const [creating, setCreating] = useState(false);

  function updateDraft<K extends keyof EventDraft>(key: K, value: EventDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit() {
    const nextErrors = validateEventDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      notify({ type: 'error', message: 'Please correct the highlighted event details.' });
      return false;
    }
    setCreating(true);
    try {
      const start = new Date(`${draft.date}T${draft.startTime}:00`);
      const end = new Date(`${draft.date}T${draft.endTime}:00`);
      const songIds = draft.songIds.filter((id) => songs.some((song) => song.id === id));
      const created = await createRehearsal('elayone-main-choir', {
        title: draft.title.trim(),
        location: draft.location.trim(),
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
        eventType: draft.eventType,
        customEventType: draft.eventType === 'CUSTOM' ? draft.customEventType.trim() : undefined,
        songIds: songIds.length ? songIds : undefined,
      });
      onCreated(created);
      setDraft(initialDraft());
      setErrors({});
      notify({ type: 'success', message: songIds.length ? `Event added with ${songIds.length} songs.` : 'Event added to the ministry calendar.' });
      return true;
    } catch (error) {
      notify({ type: 'error', message: error instanceof Error ? error.message : 'We could not add this event.' });
      return false;
    } finally {
      setCreating(false);
    }
  }

  return { draft, updateDraft, errors, creating, submit };
}
