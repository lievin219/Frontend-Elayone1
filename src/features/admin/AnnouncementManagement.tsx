import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { AdminForm } from '../../components/MinistryComponents';
import { COLORS, styles } from '../../theme';
import { deleteAnnouncement } from '../../api';
import type { AnnouncementItem } from '../../types';
import type { NoticeSetter } from './adminTypes';

const choirId = 'elayone-main-choir';
type Props = { announcements: AnnouncementItem[]; onPublished: (item: AnnouncementItem) => void; onDeleted: (id: string) => void; setNotice: NoticeSetter; busy: boolean; setBusy: (busy: boolean) => void };

export function AnnouncementManagement({ announcements, onDeleted, setNotice }: Props) {
  return <AdminForm title="Recent announcements" icon="megaphone-outline">
    {announcements.length === 0 ? <Label style={styles.adminHelp}>No announcements to manage yet.</Label> :
      announcements.map((item) => <AnnouncementRow key={item.id} item={item} onDeleted={onDeleted} setNotice={setNotice} />)}
  </AdminForm>;
}

function AnnouncementRow({ item, onDeleted, setNotice }: { item: AnnouncementItem; onDeleted: (id: string) => void; setNotice: NoticeSetter }) {
  async function remove() {
    try {
      await deleteAnnouncement(choirId, item.id);
      onDeleted(item.id); setNotice({ type: 'success', text: 'Announcement deleted.' });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Could not delete this announcement.' });
    }
  }
  return <Box style={styles.adminAnnouncementRow}>
    <Box style={{ flex: 1 }}><Label style={styles.adminAnnouncementTitle}>{item.title}</Label>
      <Label style={styles.adminAnnouncementMeta}>{item.authorName ?? 'Elayone team'} · {new Date(item.createdAt).toLocaleDateString()}</Label></Box>
    <ActionButton style={styles.removeIconButton} onPress={remove} accessibilityLabel={`Delete ${item.title}`}>
      <Icon name="trash-outline" size={17} color={COLORS.clay} />
    </ActionButton>
  </Box>;
}
