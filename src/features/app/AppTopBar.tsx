import { ActionButton, Box, Image, Label, Icon } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import logoUrl from '../../../elayone.jpg';
import { useApplication } from './ApplicationContext';

export function AppTopBar({ compact }: { compact: boolean }) {
  const { notifications, auth } = useApplication();
  return <Box style={[styles.topBar, compact && styles.mobileTopBar]}>
    <Box style={styles.brandMark}><Image source={logoUrl} style={styles.brandLogo} resizeMode="cover" /></Box>
    <Box style={styles.brandCopy}>
      <Label style={styles.brandName}>ELAYONE MUSIC</Label>
      <Label style={styles.brandSub}> Gospel Ministry</Label>
    </Box>
    <ActionButton style={styles.notificationButton} accessibilityLabel="View announcements" onPress={notifications.open}>
      <Icon name="notifications-outline" size={21} color={COLORS.ink} />
      {notifications.hasNew && <Box style={styles.notificationDot} />}
    </ActionButton>
    <ActionButton style={styles.signOutButton} accessibilityLabel="Sign out" onPress={() => void auth.logout()}>
      <Icon name="log-out-outline" size={18} color={COLORS.ink} />
    </ActionButton>
  </Box>;
}
