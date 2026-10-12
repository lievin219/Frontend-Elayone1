import type { AttendanceSummary } from '../../api';
import { formatRehearsalDate } from '../../types';
import type { AnnouncementItem, Rehearsal, SongItem, Tab } from '../../types';

export type HomeDashboardProps = {
  formattedDate: string;
  formattedTime: string;
  welcomeName: string;
  dailyVerse: string;
  liveEventLabel: string;
  liveEventState: string;
  nextRehearsal: Rehearsal | null;
  eventTypeLabel: string;
  nextRehearsalParts: ReturnType<typeof formatRehearsalDate> | null;
  attendanceSummary: AttendanceSummary;
  announcements: AnnouncementItem[];
  canManage: boolean;
  isRefreshing: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
  onOpenNotifications: () => void;
  onSendUpdate: () => void;
  upcomingRehearsalCount: number;
  songs: SongItem[];
  onOpenTab: (tab: Tab) => void;
  isCompact: boolean;
};
