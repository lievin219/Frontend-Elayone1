import { useEffect, useState } from 'react';
import { ActionButton, Box, Label, Icon } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import { useApplication } from './ApplicationContext';
import { navigationIcon } from './navigationIcon';

export function MobileNavigation({ compact }: { compact: boolean }) {
  const { navigationTabs, navigation, notifications } = useApplication();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const primaryTabs = navigationTabs.slice(0, 4);
  const moreTabs = navigationTabs.slice(4);
  const activeMore = moreTabs.includes(navigation.activeTab) && !notifications.show;

  useEffect(() => {
    if (!isMoreOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMoreOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMoreOpen]);

  const selectTab = (tab: (typeof navigationTabs)[number]) => {
    navigation.setActiveTab(tab);
    notifications.setShow(false);
    setIsMoreOpen(false);
  };

  return <>
    {isMoreOpen && moreTabs.length > 0 && (
      <>
        <ActionButton
          className="mobile-nav-backdrop"
          accessibilityLabel="Close navigation menu"
          onPress={() => setIsMoreOpen(false)}
        />
        <Box
          className="mobile-nav-sheet"
          accessibilityRole="dialog"
          accessibilityLabel="More navigation options"
        >
          <Box className="mobile-nav-sheet-heading">
            <Box>
              <Label className="mobile-nav-sheet-eyebrow">ELAYONE MUSIC</Label>
              <Label className="mobile-nav-sheet-title">Explore</Label>
            </Box>
            <ActionButton
              className="mobile-nav-close"
              accessibilityLabel="Close navigation menu"
              onPress={() => setIsMoreOpen(false)}
            >
              <Icon name="close" size={19} color={COLORS.ink} />
            </ActionButton>
          </Box>
          <Box className="mobile-nav-sheet-options">
            {moreTabs.map((tab) => {
              const active = navigation.activeTab === tab && !notifications.show;
              return (
                <ActionButton
                  key={tab}
                  className={`mobile-nav-sheet-option${active ? ' is-active' : ''}`}
                  onPress={() => selectTab(tab)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Box className="mobile-nav-sheet-icon">
                    <Icon name={navigationIcon(tab)} size={19} color={active ? '#111111' : COLORS.muted} />
                  </Box>
                  <Label className="mobile-nav-sheet-label">{tab}</Label>
                  {active && <Icon name="checkmark" size={17} color="#111111" />}
                </ActionButton>
              );
            })}
          </Box>
        </Box>
      </>
    )}
    <Box
      className={`mobile-navigation${compact ? ' is-compact' : ''}`}
      style={[styles.bottomNav, compact && styles.mobileBottomNav]}
      accessibilityRole="navigation"
      accessibilityLabel="Main navigation"
    >
    {primaryTabs.map((tab) => {
      const active = navigation.activeTab === tab && !notifications.show;
      return (
        <ActionButton
          key={tab}
          className={`mobile-navigation-item${active ? ' is-active' : ''}`}
          style={[styles.navItem, compact && styles.mobileNavItem]}
          onPress={() => selectTab(tab)}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
        >
          <Box className="mobile-navigation-icon" style={[styles.navIconWrap, active && styles.navIconActive]}>
            <Icon name={navigationIcon(tab)} size={21} color={active ? '#111111' : COLORS.muted} />
          </Box>
          <Label className="mobile-navigation-label" style={[styles.navLabel, compact && styles.mobileNavLabel, active && styles.navLabelActive]}>
            {tab}
          </Label>
        </ActionButton>
      );
    })}
    {moreTabs.length > 0 && (
      <ActionButton
        className={`mobile-navigation-item${activeMore ? ' is-active' : ''}${isMoreOpen ? ' is-open' : ''}`}
        style={[styles.navItem, compact && styles.mobileNavItem]}
        onPress={() => setIsMoreOpen((open) => !open)}
        accessibilityLabel="More navigation options"
        accessibilityRole="button"
        accessibilityState={{ selected: activeMore }}
        aria-expanded={isMoreOpen}
        aria-haspopup="dialog"
      >
        <Box className="mobile-navigation-icon">
          <Icon name={isMoreOpen ? 'close' : 'chevron-down'} size={21} color={activeMore ? '#111111' : COLORS.muted} />
        </Box>
        <Label className="mobile-navigation-label">More</Label>
      </ActionButton>
    )}
    </Box>
  </>;
}
