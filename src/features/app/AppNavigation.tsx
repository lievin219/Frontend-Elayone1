import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';

export function AppNavigation({ desktop = false, compact = false }: { desktop?: boolean; compact?: boolean }) {
  return desktop ? <DesktopNavigation /> : <MobileNavigation compact={compact} />;
}
