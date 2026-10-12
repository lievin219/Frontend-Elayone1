import { AdminForm } from '../../components/MinistryComponents';
import type { SongItem } from '../../types';
import type { BusyState, NoticeSetter } from './adminTypes';
import { SongList } from './SongList';
import { SongCreateForm } from './SongCreateForm';

type Props = { songs: SongItem[]; onAdded: (song: SongItem) => void; onDeleted: (id: string) => void; setNotice: NoticeSetter; busy: BusyState[0]; setBusy: BusyState[1] };

export function SongManagement({ songs, onAdded, onDeleted, setNotice, busy, setBusy }: Props) {
  return <AdminForm title="Manage songs" icon="musical-notes-outline">
    <SongList songs={songs} onDeleted={onDeleted} setNotice={setNotice} />
    <SongCreateForm onAdded={onAdded} setNotice={setNotice} busy={busy} setBusy={setBusy} />
  </AdminForm>;
}
