import { useState } from 'react';
import type { Tab } from '../../types';

export function useNavigationState() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [focusAnnouncementComposer, setFocusAnnouncementComposer] = useState(false);

  function focusComposer() {
    setFocusAnnouncementComposer(true);
    setActiveTab('Admin');
  }

  return {
    activeTab, setActiveTab, focusAnnouncementComposer,
    composerFocused: () => setFocusAnnouncementComposer(false), focusComposer,
  };
}
