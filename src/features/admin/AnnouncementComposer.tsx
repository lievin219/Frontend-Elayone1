import { ActionButton, Box, Label } from '../../components/WebUI';
import { AdminForm, Field } from '../../components/MinistryComponents';
import { styles } from '../../theme';
import { useAnnouncementComposer } from './useAnnouncementComposer';
import { PriorityOptions } from './PriorityOptions';
import type { BusyState, NoticeSetter } from './adminTypes';
import type { AnnouncementItem } from '../../types';

type Props = { onPublished: (item: AnnouncementItem) => void; setNotice: NoticeSetter; busy: BusyState[0]; setBusy: BusyState[1] };

export function AnnouncementComposer({ onPublished, setNotice, busy, setBusy }: Props) {
  const composer = useAnnouncementComposer(onPublished, setNotice, [busy, setBusy]);
  return <Box id="announcement-composer"><AdminForm title="Publish a ministry update" icon="megaphone-outline">
    <Field label="HEADLINE" value={composer.title} onChangeText={composer.setTitle} placeholder="A note for the ministry" />
    <Field label="MESSAGE" value={composer.message} onChangeText={composer.setMessage} placeholder="Write your announcement" multiline />
    <PriorityOptions value={composer.priority} onChange={composer.setPriority} />
    <ActionButton style={styles.adminButton} onPress={composer.publish} disabled={busy}>
      <Label style={styles.adminButtonText}>{busy ? 'Sending...' : 'Send announcement'}</Label>
    </ActionButton>
  </AdminForm></Box>;
}
