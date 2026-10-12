import { Alert } from '../../components/WebUI';
import { createRehearsal } from '../../api';
import { rehearsalColors, type Rehearsal } from '../../types';
import type { EventSubmit } from './eventTypes';

const choirId = 'elayone-main-choir';
const fail = (set: EventSubmit['setNotice'], text: string) => set({ type: 'error', text });

export async function scheduleMinistryEvent({ draft: d, songs, onAdded, setNotice, setBusy }: EventSubmit) {
  if (![d.eventTitle, d.eventLocation, d.eventDate, d.eventStartTime, d.eventEndTime].every((value) => value.trim())) return fail(setNotice, 'Add the event title, location, date, start time, and end time before saving.');
  if (d.eventType === 'CUSTOM' && !d.customEventType.trim()) return fail(setNotice, 'Enter a name for the custom event type before saving.');
  const count = Number(d.recurrenceCount);
  if (!Number.isInteger(count) || count < 1 || count > 52) return fail(setNotice, 'Choose between 1 and 52 occurrences.');
  const startsAt = new Date(`${d.eventDate}T${d.eventStartTime}:00`);
  const endsAt = new Date(`${d.eventDate}T${d.eventEndTime}:00`);
  if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime()) || endsAt <= startsAt) return fail(setNotice, 'Enter a valid date and time, and make sure the end time is after the start time.');
  if (d.inviteMode === 'SELECTED' && !d.selectedInviteeIds.length) return fail(setNotice, 'Choose at least one ministry member, or select Whole ministry.');
  const songIds = d.selectedSongIds.filter((id) => songs.some((song) => song.id === id));
  setBusy(true); setNotice(null);
  try {
    const created = await createRehearsal(choirId, { title: d.eventTitle.trim(), location: d.eventLocation.trim(), startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString(), eventType: d.eventType, customEventType: d.eventType === 'CUSTOM' ? d.customEventType.trim() : undefined, recurrenceFrequency: d.recurrenceFrequency, recurrenceCount: d.recurrenceFrequency === 'NONE' ? 1 : count, inviteeIds: d.inviteMode === 'SELECTED' ? d.selectedInviteeIds : undefined, songIds: songIds.length ? songIds : undefined });
    onAdded({ ...created, color: rehearsalColors[0] } as Rehearsal);
    resetDraft(d);
    setNotice({ type: 'success', text: eventSuccess(songIds.length, d.inviteMode, d.selectedInviteeIds.length) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'We could not schedule the event. Please try again.';
    setNotice({ type: 'error', text: message }); Alert.alert('Could not add event', message);
  } finally { setBusy(false); }
}

function resetDraft(d: EventSubmit['draft']) {
  d.setEventTitle(''); d.setEventLocation(''); d.setEventDate(''); d.setEventStartTime(''); d.setEventEndTime('');
  d.setEventType('REHEARSAL'); d.setCustomEventType(''); d.setRecurrenceFrequency('NONE'); d.setRecurrenceCount('1');
  d.setInviteMode('ALL'); d.setSelectedInviteeIds([]); d.setSelectedSongIds([]);
}

function eventSuccess(songs: number, mode: EventSubmit['draft']['inviteMode'], invitees: number) {
  if (songs) return `Event added with ${songs} song${songs === 1 ? '' : 's'}.`;
  if (mode === 'SELECTED') return `Invitation sent to ${invitees} ministry member${invitees === 1 ? '' : 's'}.`;
  return 'Event added successfully and is now visible to the whole ministry.';
}
