import { ActionButton, Box, Image, Label, Icon } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import { useApplication } from './ApplicationContext';
import { navigationIcon } from './navigationIcon';
import logoUrl from '../../../elayone.jpg';

export function DesktopNavigation() {
  const { navigationTabs, navigation, notifications, welcomeName, auth } = useApplication();
  const role = auth.session?.user.role;
  return (
    <Box
      className="ministry-sidebar"
      style={styles.desktopNav}
      accessibilityRole="navigation"
      accessibilityLabel="Main navigation"
    >
      <Box style={styles.desktopSidebarBrand}>
        <Box style={styles.desktopSidebarLogo}>
          <Image
            source={logoUrl}
            style={styles.desktopSidebarImage}
            resizeMode="cover"
            accessibilityLabel="Elayone Music"
          />
        </Box>
        <Box style={{ flex: 1 }}>
          <Label style={styles.desktopSidebarBrandName}>ELAYONE</Label>
          <Label style={styles.desktopSidebarBrandCaption}>GOSPEL MUSIC</Label>
        </Box>
      </Box>
      <Label style={styles.desktopSidebarSection}>MINISTRY</Label>
      {navigationTabs.map((tab) => {
        const active = navigation.activeTab === tab && !notifications.show;
        return (
          <ActionButton
            key={tab}
            style={[styles.navItem, styles.desktopNavItem, active && styles.desktopNavItemActive]}
            onPress={() => {
              navigation.setActiveTab(tab);
              notifications.setShow(false);
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Box style={[styles.navIconWrap, styles.desktopNavIconWrap, active && styles.navIconActive]}>
              <Icon name={navigationIcon(tab)} size={19} color={active ? '#111111' : COLORS.muted} />
            </Box>
            <Label style={[styles.desktopNavLabel, active && styles.navLabelActive]}>{tab}</Label>
            {active && <Box style={styles.desktopNavIndicator} />}
          </ActionButton>
        );
      })}
      <Box style={styles.desktopSidebarFooter}>
        <Icon name="cross-outline" size={15} color="#ffffff" />
        <Box style={{ flex: 1 }}>
          <Label style={styles.desktopSidebarFooterName}>{welcomeName}</Label>
          <Label style={styles.desktopSidebarFooterRole}>
            {role === 'ADMIN' ? 'MINISTRY ADMIN' : role === 'LEADER' ? 'MINISTRY LEADER' : 'MINISTRY MEMBER'}
          </Label>
        </Box>
      </Box>
    </Box>
  );
}
