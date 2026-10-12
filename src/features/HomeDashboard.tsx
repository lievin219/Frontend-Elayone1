import { Box } from '../components/WebUI';
import { HomeHero } from './home/HomeHero';
import { HomeUpdatesCard } from './home/HomeUpdatesCard';
import { HomeNextEventCard } from './home/HomeNextEventCard';
import { HomeWeeklySummary } from './home/HomeWeeklySummary';
import { HomeQuickAccess } from './home/HomeQuickAccess';
import type { HomeDashboardProps } from './home/types';

export function HomeDashboard(props: HomeDashboardProps) {
  return (
    <Box className="home-dashboard-page">
      <HomeHero
        formattedDate={props.formattedDate}
        formattedTime={props.formattedTime}
        welcomeName={props.welcomeName}
        dailyVerse={props.dailyVerse}
        isCompact={props.isCompact}
      />
      <HomeUpdatesCard
        announcements={props.announcements}
        isRefreshing={props.isRefreshing}
        lastUpdated={props.lastUpdated}
        onRefresh={props.onRefresh}
        onOpenNotifications={props.onOpenNotifications}
      />
      <HomeNextEventCard
        nextRehearsal={props.nextRehearsal}
        liveEventLabel={props.liveEventLabel}
        liveEventState={props.liveEventState}
        eventTypeLabel={props.eventTypeLabel}
        nextRehearsalParts={props.nextRehearsalParts}
        isCompact={props.isCompact}
        onOpenCalendar={() => props.onOpenTab('Calendar')}
      />
      <HomeWeeklySummary
        upcomingRehearsalCount={props.upcomingRehearsalCount}
        attendanceSummary={props.attendanceSummary}
        songCount={props.songs.length}
        onOpenCalendar={() => props.onOpenTab('Calendar')}
      />
      <HomeQuickAccess
        canManage={props.canManage}
        onOpenTab={props.onOpenTab}
        onSendUpdate={props.onSendUpdate}
        onOpenNotifications={props.onOpenNotifications}
      />
    </Box>
  );
}
