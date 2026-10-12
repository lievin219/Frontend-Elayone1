import { useMemo } from 'react';
import type { Tab } from '../../types';
import { useDashboardState } from './useDashboardState';
import { useMinistryData } from './useMinistryData';
import { useNavigationState } from './useNavigationState';
import { useNotificationState } from './useNotificationState';
import { useSessionState } from './useSessionState';

export function useApplicationState() {
  const auth = useSessionState();
  const ministry = useMinistryData(auth.session);
  const notifications = useNotificationState(
    ministry.announcements, ministry.reminders, ministry.lastRefresh, Boolean(auth.session),
  );
  const dashboard = useDashboardState(ministry.rehearsals, ministry.summary, ministry.songs);
  const navigation = useNavigationState();
  const isAdmin = auth.session?.user.role === 'ADMIN' || auth.session?.user.role === 'LEADER';
  const welcomeName = auth.session?.user.name.split(' ')[0] ?? 'Ministry member';
  const navigationTabs: Tab[] = useMemo(() => [
    'Home', 'Calendar', 'Songs', 'Reports', 'Profile', ...(isAdmin ? ['Admin' as Tab] : []),
  ], [isAdmin]);
  return { auth, ministry, notifications, dashboard, navigation, isAdmin, welcomeName, navigationTabs };
}
