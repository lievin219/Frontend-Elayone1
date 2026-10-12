import { useState } from 'react';
import { publishAnnouncement } from '../../api';
import type { AnnouncementItem } from '../../types';
import type { BusyState, NoticeSetter } from './adminTypes';

const choirId = 'elayone-main-choir';

export function useAnnouncementComposer(onPublished: (item: AnnouncementItem) => void, setNotice: NoticeSetter, [, setBusy]: BusyState) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'NORMAL' | 'IMPORTANT'>('NORMAL');
  async function publish() {
    if (!title.trim() || !message.trim()) return setNotice({ type: 'error', text: 'Please add both a title and a message before sending the announcement.' });
    setBusy(true); setNotice(null);
    try {
      const item = await publishAnnouncement(choirId, { title: title.trim(), message: message.trim(), priority });
      onPublished({ ...item, authorName: item.author?.name ?? 'You' });
      setTitle(''); setMessage(''); setPriority('NORMAL');
      setNotice({ type: 'success', text: 'Announcement sent successfully. The ministry can now see it.' });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Unable to send the announcement right now.' });
    } finally { setBusy(false); }
  }
  return { title, setTitle, message, setMessage, priority, setPriority, publish };
}
