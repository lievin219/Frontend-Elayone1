import { useEffect, useState } from 'react';
import { Box, Icon, Label } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import { useMemberManagement } from './useMemberManagement';
import { MemberManagementSection } from './MemberManagementSection';
import { EventPlanForm } from './EventPlanForm';
import { AnnouncementManagement } from './AnnouncementManagement';
import { SongManagement } from './SongManagement';
import { AnnouncementComposer } from './AnnouncementComposer';
import { AdminNoticeBanner } from './AdminNoticeBanner';
import type { AdminPanelProps } from './adminTypes';

export type { AdminPanelProps } from './adminTypes';

export function AdminPanel(props: AdminPanelProps) {
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const members = useMemberManagement(setNotice);
  useEffect(() => {
    if (!props.focusAnnouncementComposer) return;
    const composer = document.getElementById('announcement-composer');
    composer?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    composer?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
    props.onAnnouncementComposerFocused?.();
  }, [props.focusAnnouncementComposer, props.onAnnouncementComposerFocused]);
  return <Box>
    <AdminHeading />
    <AdminNoticeBanner notice={notice} />
    <MemberManagementSection management={members} />
    <EventPlanForm songs={props.songs} members={members} onRehearsalAdded={props.onRehearsalAdded} setNotice={setNotice} busy={busy} setBusy={setBusy} />
    <AnnouncementManagement announcements={props.announcements} onPublished={props.onAnnouncementPublished} onDeleted={props.onAnnouncementDeleted} setNotice={setNotice} busy={busy} setBusy={setBusy} />
    <SongManagement songs={props.songs} onAdded={props.onSongAdded} onDeleted={props.onSongDeleted} setNotice={setNotice} busy={busy} setBusy={setBusy} />
    <AnnouncementComposer onPublished={props.onAnnouncementPublished} setNotice={setNotice} busy={busy} setBusy={setBusy} />
  </Box>;
}

function AdminHeading() {
  return <>
    <Label style={styles.pageEyebrow}>ELAYONE / ADMIN</Label>
    <Label style={styles.pageTitle}>Lead the ministry</Label>
    <Label style={styles.pageCaption}>Manage accounts, events, songs, and updates.</Label>
    <Box style={styles.adminNotice}>
      <Icon name="shield-checkmark-outline" size={20} color={COLORS.olive} />
      <Box style={{ flex: 1 }}>
        <Label style={styles.adminNoticeTitle}>Leader access</Label>
        <Label style={styles.adminNoticeText}>Your changes are shared with the whole ministry.</Label>
      </Box>
    </Box>
  </>;
}
