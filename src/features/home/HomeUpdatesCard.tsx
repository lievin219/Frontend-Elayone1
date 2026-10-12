import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { COLORS } from '../../theme';
import type { AnnouncementItem } from '../../types';

type HomeUpdatesCardProps = {
  announcements: AnnouncementItem[];
  isRefreshing: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
  onOpenNotifications: () => void;
};

export function HomeUpdatesCard({
  announcements, isRefreshing, lastUpdated, onRefresh, onOpenNotifications,
}: HomeUpdatesCardProps) {
  const announcement = announcements[0];
  return (
    <Box className="home-updates-card">
      <Box className="home-updates-heading">
        <Box>
          <Label className="home-updates-eyebrow">MINISTRY UPDATES</Label>
          <Label className="home-updates-title">Latest updates</Label>
        </Box>
        <ActionButton className="home-refresh-button" onPress={onRefresh}
          disabled={isRefreshing} accessibilityLabel="Refresh dashboard information">
          <Icon name="refresh-outline" size={17} color={COLORS.ink} />
          <Label>{isRefreshing ? 'Refreshing…' : 'Refresh'}</Label>
        </ActionButton>
      </Box>
      {announcement ? (
        <Box className="home-latest-update">
          <Box className="home-latest-update-meta">
            <Label className="home-update-priority">
              {announcement.priority === 'IMPORTANT' ? 'IMPORTANT' : 'LATEST UPDATE'}
            </Label>
            <Label className="home-update-date">
              {new Date(announcement.createdAt).toLocaleString([], {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
              })}
            </Label>
          </Box>
          <Label className="home-update-title">{announcement.title}</Label>
          <Label className="home-update-message">{announcement.message}</Label>
        </Box>
      ) : <Label className="home-no-updates">No updates yet. Check back soon.</Label>}
      <Box className="home-updates-footer">
        <Label className="home-updated-at">
          {lastUpdated ? `Updated ${lastUpdated}` : 'Loading updates…'}
        </Label>
        <ActionButton className="home-updates-link" onPress={onOpenNotifications}>
          <Label>All updates</Label>
          <Icon name="arrow-forward" size={14} color={COLORS.ink} />
        </ActionButton>
      </Box>
    </Box>
  );
}
