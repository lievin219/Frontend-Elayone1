import { useEffect, useState } from 'react';
import type { AttendanceSummary, MinistryTeam, ReminderRecord, Session } from '../../api';
import { getRehearsals } from '../../api';
import type { AnnouncementItem, MinistryAvailability, Rehearsal, SongItem } from '../../types';
import { colorEvents, loadMinistryData } from './loadMinistryData';

const emptySummary: AttendanceSummary = { total: 0, confirmed: 0, rate: 0, upcoming: 0 };

export function useMinistryData(session: Session | null) {
  const [summary, setSummary] = useState(emptySummary);
  const [rehearsals, setRehearsals] = useState<Rehearsal[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [reminders, setReminders] = useState<ReminderRecord[]>([]);
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [profileMinistry, setProfileMinistry] = useState<{ team: MinistryTeam; availability: MinistryAvailability } | null>(null);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!session) {
      setSummary(emptySummary);
      setRehearsals([]);
      setAnnouncements([]);
      setReminders([]);
      setSongs([]);
      setProfileMinistry(null);
      setError('');
      setLastRefresh(null);
      return;
    }
    let active = true;
    setRefreshing(true);
    loadMinistryData(session.user.id).then((data) => {
      if (!active) return;
      setSummary(data.summary);
      setRehearsals(data.rehearsals);
      setAnnouncements(data.announcements);
      setReminders(data.reminders);
      setSongs(data.songs);
      setProfileMinistry(data.profileMinistry);
      setError('');
      setLastRefresh(new Date());
    }).catch((failure) => {
      if (active) setError(failure instanceof Error ? failure.message : 'Could not load ministry information. Please try again.');
    }).finally(() => {
      if (active) setRefreshing(false);
    });
    return () => { active = false; };
  }, [session, reloadKey]);

  useEffect(() => {
    if (!session) return;
    const interval = setInterval(() => setReloadKey((key) => key + 1), 60_000);
    return () => clearInterval(interval);
  }, [session]);

  async function refreshEvents() {
    const events = await getRehearsals('elayone-main-choir');
    setRehearsals(colorEvents(events));
  }

  return {
    summary, rehearsals, setRehearsals, announcements, setAnnouncements,
    reminders, songs, setSongs, profileMinistry, error, refreshing, lastRefresh,
    reload: () => setReloadKey((key) => key + 1), refreshEvents,
  };
}
