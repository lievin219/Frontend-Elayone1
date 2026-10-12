import type { Dispatch, SetStateAction } from 'react';
import type { EventType } from '../../api';
import type { DirectoryUser } from '../../api';
import type { SongItem } from '../../types';

export type RepeatFrequency = 'NONE' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
export type InviteMode = 'ALL' | 'SELECTED';
export type EventDraft = {
  eventTitle: string; setEventTitle: (value: string) => void;
  eventLocation: string; setEventLocation: (value: string) => void;
  eventDate: string; setEventDate: (value: string) => void;
  eventStartTime: string; setEventStartTime: (value: string) => void;
  eventEndTime: string; setEventEndTime: (value: string) => void;
  eventType: EventType; setEventType: (value: EventType) => void;
  customEventType: string; setCustomEventType: (value: string) => void;
  recurrenceFrequency: RepeatFrequency; setRecurrenceFrequency: (value: RepeatFrequency) => void;
  recurrenceCount: string; setRecurrenceCount: (value: string) => void;
  inviteMode: InviteMode; setInviteMode: (value: InviteMode) => void;
  selectedInviteeIds: string[]; setSelectedInviteeIds: Dispatch<SetStateAction<string[]>>;
  selectedSongIds: string[]; setSelectedSongIds: Dispatch<SetStateAction<string[]>>;
};
export type EventSubmit = {
  draft: EventDraft; songs: SongItem[]; onAdded: (event: import('../../types').Rehearsal) => void;
  setNotice: (notice: import('./adminTypes').AdminNotice | null) => void;
  setBusy: Dispatch<SetStateAction<boolean>>;
};
export type EventMembers = { users: DirectoryUser[]; usersLoading: boolean };
