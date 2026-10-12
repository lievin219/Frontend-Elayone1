import { ActionButton, Box, Label, Icon } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import { useApplication } from './ApplicationContext';
import { navigationIcon } from './navigationIcon';

export function MobileNavigation({ compact }: { compact: boolean }) {
  const { navigationTabs, navigation, notifications } = useApplication();
  return <Box style={[styles.bottomNav, compact && styles.mobileBottomNav]} accessibilityRole="navigation" accessibilityLabel="Main navigation">
    {navigationTabs.map((tab) => {
      const active = navigation.activeTab === tab && !notifications.show;
      return (
        <ActionButton
          key={tab}
          style={[styles.navItem, compact && styles.mobileNavItem]}
          onPress={() => {
            navigation.setActiveTab(tab);
            notifications.setShow(false);
          }}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
        >
          <Box style={[styles.navIconWrap, active && styles.navIconActive]}>
            <Icon name={navigationIcon(tab)} size={21} color={active ? '#111111' : COLORS.muted} />
          </Box>
          <Label style={[styles.navLabel, compact && styles.mobileNavLabel, active && styles.navLabelActive]}>
            {tab}
          </Label>
        </ActionButton>
      );
    })}
  </Box>;
}
