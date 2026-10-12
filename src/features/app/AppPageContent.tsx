import {
  updateAttendance,
  updateRehearsalSongs,
} from '../../api';
import { useViewportSize } from '../../components/WebUI';
import { AdminPanel } from '../Admin';
import { AttendanceReportScreen } from '../AttendanceReports';
import { CalendarScreen } from '../Calendar';
import { HomeDashboard } from '../HomeDashboard';
import { NotificationsPanel } from '../NotificationsPanel';
import { Profile } from '../Profile';
import { SongLibrary } from '../SongLibrary';
import { rehearsalColors } from '../../types';
import { useApplication } from './ApplicationContext';

const choirId = 'elayone-main-choir';
const dailyVerse = '“But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.” — Isaiah 40:31 (KJV)';

export function AppPageContent() {
  const { width } = useViewportSize();
  const { auth, dashboard, ministry, navigation, notifications, isAdmin, welcomeName } = useApplication();
  const isCompact = width < 390;
  const session = auth.session;

  if (notifications.show) {
    return (
      <NotificationsPanel
        announcements={ministry.announcements}
        reminders={ministry.reminders}
        onClose={() => notifications.setShow(false)}
      />
    );
  }

  if (navigation.activeTab === 'Home') {
    return (
      <HomeDashboard
        formattedDate={dashboard.now.toLocaleDateString(undefined, {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })}
        formattedTime={dashboard.now.toLocaleTimeString([], {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
        })}
        welcomeName={welcomeName}
        dailyVerse={dailyVerse}
        liveEventLabel={dashboard.liveLabel}
        liveEventState={dashboard.liveState}
        nextRehearsal={dashboard.next}
        eventTypeLabel={dashboard.eventType}
        nextRehearsalParts={dashboard.nextParts}
        attendanceSummary={dashboard.summary}
        announcements={ministry.announcements}
        canManage={isAdmin}
        isRefreshing={ministry.refreshing}
        lastUpdated={ministry.lastRefresh?.toLocaleTimeString([], {
          hour: 'numeric', minute: '2-digit',
        }) ?? null}
        onRefresh={ministry.reload}
        onOpenNotifications={notifications.open}
        onSendUpdate={navigation.focusComposer}
        upcomingRehearsalCount={dashboard.upcoming}
        songs={dashboard.songs}
        onOpenTab={navigation.setActiveTab}
        isCompact={isCompact}
      />
    );
  }

  if (navigation.activeTab === 'Calendar') {
    return (
      <CalendarScreen
        events={dashboard.ordered}
        songs={ministry.songs}
        canManage={isAdmin}
        onRefresh={ministry.refreshEvents}
        onEventCreated={(event) => {
          ministry.setRehearsals((current) => [...current, {
            ...event,
            color: rehearsalColors[current.length % rehearsalColors.length],
          }]);
        }}
        onSaveSongs={async (eventId, songIds) => {
          const updatedSongs = await updateRehearsalSongs(choirId, eventId, songIds);
          ministry.setRehearsals((current) => current.map((event) => (
            event.id === eventId ? { ...event, songs: updatedSongs } : event
          )));
          return updatedSongs;
        }}
        onRespond={async (eventId, status) => {
          await updateAttendance(choirId, eventId, status);
          await ministry.refreshEvents();
        }}
      />
    );
  }

  if (navigation.activeTab === 'Reports') {
    return <AttendanceReportScreen canManage={isAdmin} />;
  }

  if (navigation.activeTab === 'Profile' && session) {
    return (
      <Profile
        memberName={session.user.name}
        email={session.user.email}
        role={session.user.role}
        team={ministry.profileMinistry?.team ?? null}
        availability={ministry.profileMinistry?.availability ?? null}
        memberUserId={session.user.id}
      />
    );
  }

  if (navigation.activeTab === 'Songs') {
    return <SongLibrary songs={ministry.songs} />;
  }

  if (navigation.activeTab !== 'Admin' || !isAdmin) return null;

  return (
    <AdminPanel
      announcements={ministry.announcements}
      onAnnouncementPublished={(announcement) => {
        const nextAnnouncement = {
          ...announcement,
          authorName: announcement.authorName ?? session?.user.name ?? 'Admin',
        };
        ministry.setAnnouncements((current) => [nextAnnouncement, ...current]);
        notifications.recordAnnouncement(nextAnnouncement.id);
      }}
      onAnnouncementDeleted={(id) => {
        ministry.setAnnouncements((current) => current.filter((announcement) => announcement.id !== id));
        notifications.removeAnnouncement(id);
      }}
      songs={ministry.songs}
      onSongAdded={(song) => ministry.setSongs((current) => [song, ...current])}
      onSongDeleted={(id) => ministry.setSongs((current) => current.filter((song) => song.id !== id))}
      onRehearsalAdded={(rehearsal) => {
        ministry.setRehearsals((current) => [{
          ...rehearsal,
          color: rehearsal.color ?? rehearsalColors[current.length % rehearsalColors.length],
        }, ...current]);
      }}
      focusAnnouncementComposer={navigation.focusAnnouncementComposer}
      onAnnouncementComposerFocused={navigation.composerFocused}
    />
  );
}
