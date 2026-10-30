import type { AttendanceResponseStatus, EventSongRecord, EventType, RehearsalRecord } from '../../api';
import type { Rehearsal, SongItem } from '../../types';

export type CalendarNotice = { type: 'success' | 'error'; message: string };

export type CalendarScreenProps = {
  events: Rehearsal[];
  songs: SongItem[];
  canManage: boolean;
  onRefresh: () => Promise<void>;
  onEventCreated: (event: RehearsalRecord) => void;
  onSaveSongs: (eventId: string, songIds: string[]) => Promise<EventSongRecord[]>;
  onRespond: (eventId: string, status: AttendanceResponseStatus) => Promise<void>;
};

export type CalendarEventCardProps = {
  event: Rehearsal;
  songs: SongItem[];
  canManage: boolean;
  response: AttendanceResponseStatus;
  busy: boolean;
  onSaveSongs: (eventId: string, songIds: string[]) => Promise<EventSongRecord[]>;
  onRespond: (status: AttendanceResponseStatus) => void;
};

export type EventDraft = {
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  eventType: EventType;
  customEventType: string;
  songIds: string[];
};

export type EventFieldErrors = Partial<Record<keyof Omit<EventDraft, 'eventType' | 'songIds'>, string>>;
