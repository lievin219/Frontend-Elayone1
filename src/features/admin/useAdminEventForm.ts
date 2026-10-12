import { useState } from 'react';
import type { EventType } from '../../api';
import type { BusyState } from './adminTypes';
import type { EventDraft, InviteMode, RepeatFrequency } from './eventTypes';

export function useAdminEventForm([, setBusy]: BusyState) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventType, setEventType] = useState<EventType>('REHEARSAL');
  const [customEventType, setCustomEventType] = useState('');
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<RepeatFrequency>('NONE');
  const [recurrenceCount, setRecurrenceCount] = useState('1');
  const [inviteMode, setInviteMode] = useState<InviteMode>('ALL');
  const [selectedInviteeIds, setSelectedInviteeIds] = useState<string[]>([]);
  const [selectedSongIds, setSelectedSongIds] = useState<string[]>([]);
  const draft: EventDraft = { eventTitle, setEventTitle, eventLocation, setEventLocation, eventDate, setEventDate, eventStartTime, setEventStartTime, eventEndTime, setEventEndTime, eventType, setEventType, customEventType, setCustomEventType, recurrenceFrequency, setRecurrenceFrequency, recurrenceCount, setRecurrenceCount, inviteMode, setInviteMode, selectedInviteeIds, setSelectedInviteeIds, selectedSongIds, setSelectedSongIds };
  return { draft, setBusy };
}
