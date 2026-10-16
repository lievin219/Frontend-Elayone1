import { ActionButton, Box, Image, Label, Icon } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import logoUrl from '../../../elayone.jpg';
import { useApplication } from './ApplicationContext';

export function AppTopBar({ compact }: { compact: boolean }) {
  const { notifications, auth } = useApplication();
  return <Box className="app-topbar" style={[styles.topBar, compact && styles.mobileTopBar]}>
    <Box className="brand-mark" style={styles.brandMark}><Image source={logoUrl} style={styles.brandLogo} resizeMode="cover" /></Box>
    <Box className="brand-copy" style={styles.brandCopy}>
      <Label className="brand-name" style={styles.brandName}>ELAYONE MUSIC</Label>
      <Label className="brand-sub" style={styles.brandSub}> Gospel Ministry</Label>
    </Box>
    <ActionButton
      className={`notification-button${notifications.hasNew ? ' has-unread' : ''}`}
      style={styles.notificationButton}
      accessibilityLabel={notifications.unreadCount ? `View announcements, ${notifications.unreadCount} new notifications` : 'View announcements'}
      onPress={notifications.open}
    >
      <Icon name="notifications-outline" size={21} color={COLORS.ink} />
      {notifications.unreadCount > 0 && (
        <Label className="notification-badge">{notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}</Label>
      )}
    </ActionButton>
    <ActionButton
      className="sign-out-button"
      style={styles.signOutButton}
      accessibilityLabel="Log out of Elayone Music"
      onPress={() => void auth.logout()}
    >
      <Icon name="log-out-outline" size={18} color={COLORS.ink} />
      <Label className="sign-out-label">Log out</Label>
    </ActionButton>
  </Box>;
}
