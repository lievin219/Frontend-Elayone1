import { ActionButton, Box, Icon, Label } from '../components/WebUI';
import type { ReminderRecord } from '../api';
import { COLORS, styles } from '../theme';
import type { AnnouncementItem } from '../types';

type NotificationsPanelProps = {
  announcements: AnnouncementItem[];
  reminders: ReminderRecord[];
  onClose: () => void;
};

export function NotificationsPanel({ announcements, reminders, onClose }: NotificationsPanelProps) {
  return (
    <Box className="notifications-panel" style={styles.notificationsPanel}>
      <Box style={styles.notificationsHeader}>
        <Box>
          <Label className="responsive-eyebrow" style={styles.pageEyebrow}>ELAYONE / ALERTS</Label>
          <Label className="responsive-page-title" style={styles.pageTitle}>Notifications</Label>
        </Box>
        <ActionButton onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={18} color={COLORS.ink} />
        </ActionButton>
      </Box>
      {announcements.length === 0 && reminders.length === 0
        ? <Box style={styles.emptyState}>
          <Icon name="notifications-off-outline" size={24} color={COLORS.muted} />
          <Label style={styles.emptyStateTitle}>You’re all caught up</Label>
          <Label style={styles.emptyStateText}>New event reminders and ministry updates will appear here.</Label>
        </Box>
        : <>
          {reminders.map((item) => <Box key={item.id} className={`notification-card notification-card-reminder${item.priority === 'IMPORTANT' ? ' is-important' : ''}`} style={styles.notificationCard}>
            <Box style={styles.notificationTop}>
              <Label style={styles.notificationLabel}>{item.priority === 'IMPORTANT' ? 'ACTION NEEDED' : 'REMINDER'}</Label>
              <Label style={styles.notificationTime}>{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Label>
            </Box>
            <Label style={styles.notificationTitle}>{item.title}</Label>
            <Box style={styles.notificationMeta}>
              <Icon name={item.kind === 'RESPONSE' ? 'checkbox-outline' : 'calendar-outline'} size={14} color={COLORS.muted} />
              <Label style={styles.notificationAuthor}>{item.kind === 'RESPONSE' ? 'Response reminder' : 'Event reminder'}</Label>
            </Box>
            <Label style={styles.notificationMessage}>{item.message}</Label>
          </Box>)}
          {announcements.map((item) => <Box key={item.id} className={`notification-card notification-card-announcement${item.priority === 'IMPORTANT' ? ' is-important' : ''}`} style={styles.notificationCard}>
            <Box style={styles.notificationTop}>
              <Label style={styles.notificationLabel}>{item.priority === 'IMPORTANT' ? 'IMPORTANT' : 'UPDATE'}</Label>
              <Label style={styles.notificationTime}>{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Label>
            </Box>
            <Label style={styles.notificationTitle}>{item.title}</Label>
            <Box style={styles.notificationMeta}>
              <Icon name="person-circle-outline" size={14} color={COLORS.muted} />
              <Label style={styles.notificationAuthor}>{item.authorName ?? item.author?.name ?? 'Elayone team'}</Label>
            </Box>
            <Label style={styles.notificationMessage}>{item.message}</Label>
          </Box>)}
        </>}
    </Box>
  );
}
