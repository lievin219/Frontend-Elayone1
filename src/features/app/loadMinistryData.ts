import {
  getAnnouncements,
  getAttendanceSummary,
  getChoirPeople,
  getRehearsals,
  getReminders,
  getSongs,
} from '../../api';
import type { AnnouncementItem, Rehearsal, SongItem } from '../../types';
import type { RehearsalRecord } from '../../api';
import { rehearsalColors } from '../../types';

export async function loadMinistryData(userId: string) {
  const choirId = 'elayone-main-choir';
  const [summary, events, people, [announcements, songs, reminders]] = await Promise.all([
    getAttendanceSummary(choirId),
    getRehearsals(choirId),
    getChoirPeople(choirId),
    Promise.all([getAnnouncements(choirId), getSongs(choirId), getReminders(choirId)]),
  ]);
  const ownMembership = people.find((membership) => membership.user.id === userId);
  return {
    summary,
    rehearsals: colorEvents(events),
    announcements: announcements.map((item): AnnouncementItem => ({
      ...item,
      authorName: item.author?.name ?? 'Elayone team',
    })),
    reminders,
    songs: songs.map((song): SongItem => ({
      ...song,
      icon: song.status === 'LEARN' ? 'book-outline' : 'musical-notes-outline',
    })),
    profileMinistry: ownMembership ? {
      team: ownMembership.ministryTeam,
      availability: ownMembership.availability,
    } : null,
  };
}

export function colorEvents(events: RehearsalRecord[]): Rehearsal[] {
  return events.map((event, index) => ({
    ...event,
    color: rehearsalColors[index % rehearsalColors.length],
  }));
}
