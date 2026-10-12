import { Box, Label } from '../../components/WebUI';
import { QuickAction } from '../../components/MinistryComponents';
import { styles } from '../../theme';
import type { Tab } from '../../types';

type HomeQuickAccessProps = {
  canManage: boolean;
  onOpenTab: (tab: Tab) => void;
  onSendUpdate: () => void;
  onOpenNotifications: () => void;
};

export function HomeQuickAccess({
  canManage, onOpenTab, onSendUpdate, onOpenNotifications,
}: HomeQuickAccessProps) {
  return (
    <>
      <Box className="home-section-header home-quick-header" style={styles.sectionHeader}>
        <Box>
          <Label style={styles.sectionTitle}>Quick access</Label>
          <Label style={styles.sectionCaption}>What do you need today?</Label>
        </Box>
      </Box>
      <Box className="home-quick-grid" style={styles.quickGrid}>
        <QuickAction icon="calendar-outline" label="Open calendar" onPress={() => onOpenTab('Calendar')} />
        <QuickAction icon="person-outline" label="My profile" onPress={() => onOpenTab('Profile')} />
        <QuickAction icon="musical-notes-outline" label="Song library" onPress={() => onOpenTab('Songs')} />
        <QuickAction icon={canManage ? 'megaphone-outline' : 'notifications-outline'}
          label={canManage ? 'Send update' : 'View updates'}
          onPress={canManage ? onSendUpdate : onOpenNotifications} />
      </Box>
    </>
  );
}
