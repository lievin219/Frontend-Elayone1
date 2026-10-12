import type { AttendanceResponseStatus, RehearsalRecord } from './api';

export type IconName = string;

export type Tab = 'Home' | 'Calendar' | 'Songs' | 'Reports' | 'Profile' | 'Admin';

export type Rehearsal = RehearsalRecord & { color: string };

export type MinistryAvailability = 'YES' | 'MAYBE' | 'NO' | 'PENDING';

export const responseLabels: Record<AttendanceResponseStatus, string> = { YES: 'Available · YES', MAYBE: 'Maybe', NO: 'Unavailable · NO', PENDING: 'No response yet' };

export function responseDescription(status: AttendanceResponseStatus, personal = true) {
  if (status === 'YES') return personal ? 'You selected YES: you are available.' : 'Selected YES: available.';
  if (status === 'MAYBE') return personal ? 'You selected Maybe: you are unsure.' : 'Selected Maybe: member is unsure.';
  if (status === 'NO') return personal ? 'You selected NO: you are unavailable.' : 'Selected NO: unavailable.';
  return personal ? 'No response yet: choose an option when you know.' : 'No response yet: member has not chosen.';
}

export function formatRehearsalDate(input: string) {
  const date = new Date(input);
  const day = date.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
  const dateNumber = date.toLocaleDateString(undefined, { day: '2-digit' });
  const month = date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  const start = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return { day, dateNumber, month, start };
}

export const rehearsalColors = ['#1c1c1c', '#c9b99a', '#82746a', '#8c9d85', '#c7916d'];

export type AnnouncementItem = {
  id: string;
  title: string;
  message: string;
  priority: 'NORMAL' | 'IMPORTANT';
  createdAt: string;
  author?: { name: string } | null;
  authorName?: string;
};

export type SongItem = {
  id?: string;
  title: string;
  key: string | null;
  status: string;
  notes?: string | null;
  previewUrl?: string | null;
  icon?: IconName;
};
