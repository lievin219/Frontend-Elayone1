import type { IconName, Tab } from '../../types';

const icons: Record<Tab, IconName> = {
  Home: 'home-outline',
  Calendar: 'calendar-outline',
  Songs: 'audio-lines-outline',
  Reports: 'stats-chart-outline',
  Profile: 'person-outline',
  Admin: 'shield-checkmark-outline',
};

export function navigationIcon(tab: Tab): IconName {
  return icons[tab];
}
