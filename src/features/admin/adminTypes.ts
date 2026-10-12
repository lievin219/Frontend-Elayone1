import type { Dispatch, SetStateAction } from 'react';
import type { AnnouncementItem, Rehearsal, SongItem } from '../../types';

export type AdminNotice = { type: 'success' | 'error'; text: string };
export type NoticeSetter = (notice: AdminNotice | null) => void;
export type BusyState = [boolean, Dispatch<SetStateAction<boolean>>];

export type AdminPanelProps = {
  announcements: AnnouncementItem[];
  onAnnouncementPublished: (item: AnnouncementItem) => void;
  onAnnouncementDeleted: (id: string) => void;
  songs: SongItem[];
  onSongAdded: (song: SongItem) => void;
  onSongDeleted: (id: string) => void;
  onRehearsalAdded: (rehearsal: Rehearsal) => void;
  focusAnnouncementComposer?: boolean;
  onAnnouncementComposerFocused?: () => void;
};
