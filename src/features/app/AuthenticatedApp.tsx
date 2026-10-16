import { Box, ScrollArea, useViewportSize } from '../../components/WebUI';
import { styles } from '../../theme';
import { useApplication } from './ApplicationContext';
import { AppTopBar } from './AppTopBar';
import { AppNavigation } from './AppNavigation';
import { AppPageContent } from './AppPageContent';
import { ApplicationError } from './ApplicationError';

export function AuthenticatedApp() {
  const { width } = useViewportSize();
  const isDesktop = width >= 900;
  const isCompact = width < 390;
  const { navigation, ministry } = useApplication();

  return (
    <Box className="ministry-background" style={styles.safeArea}>
      <Box className="ministry-ambient" aria-hidden="true"><Box className="ministry-music-art"><Box className="music-note music-note-single" /><Box className="music-note music-note-pair" /></Box></Box>
      <Box style={[styles.appShell, isDesktop && styles.desktopAppShell, isCompact && styles.mobileAppShell]}>
        {isDesktop && <AppNavigation desktop />}
        <ScrollArea className="authenticated-scroll-area" style={{ flex: 1 }} contentContainerStyle={[styles.scrollContent, isDesktop && styles.desktopScrollContent, isCompact && styles.mobileScrollContent]} showsVerticalScrollIndicator={false}>
          <AppTopBar compact={isCompact} />
          <ApplicationError message={ministry.error} onRetry={ministry.reload} />
          <AppPageContent />
        </ScrollArea>
        {!isDesktop && <AppNavigation compact={isCompact} />}
      </Box>
    </Box>
  );
}
