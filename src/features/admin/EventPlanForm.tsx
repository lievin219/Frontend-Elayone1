import { ActionButton, Label } from '../../components/WebUI';
import { AdminForm } from '../../components/MinistryComponents';
import { EventSongPicker } from '../Calendar';
import { styles } from '../../theme';
import { useAdminEventForm } from './useAdminEventForm';
import { scheduleMinistryEvent } from './scheduleMinistryEvent';
import { EventFields } from './EventFields';
import { EventAudience } from './EventAudience';
import type { BusyState, NoticeSetter } from './adminTypes';
import type { useMemberManagement } from './useMemberManagement';
import type { Rehearsal, SongItem } from '../../types';

type Members = ReturnType<typeof useMemberManagement>;
type Props = { songs: SongItem[]; members: Members; onRehearsalAdded: (event: Rehearsal) => void; setNotice: NoticeSetter; busy: BusyState[0]; setBusy: BusyState[1] };

export function EventPlanForm({ songs, members, onRehearsalAdded, setNotice, busy, setBusy }: Props) {
  const { draft } = useAdminEventForm([busy, setBusy]);
  return <AdminForm title="Plan a service or rehearsal" icon="calendar-outline">
    <EventFields draft={draft} />
    <EventAudience draft={draft} members={members} />
    <Label style={[styles.fieldLabel, { marginTop: 5, marginBottom: 8 }]}>SONGS FOR THIS EVENT</Label>
    <EventSongPicker songs={songs} selectedSongIds={draft.selectedSongIds} onChange={draft.setSelectedSongIds} />
    <ActionButton style={styles.adminButton} onPress={() => scheduleMinistryEvent({ draft, songs, onAdded: onRehearsalAdded, setNotice, setBusy })} disabled={busy}>
      <Label style={styles.adminButtonText}>{busy ? 'Saving...' : draft.inviteMode === 'SELECTED' ? 'Schedule and invite' : 'Add event for ministry'}</Label>
    </ActionButton>
  </AdminForm>;
}
