import { useCallback, useState } from 'react';
import { Box } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarScreenProps, CalendarNotice as Notice } from './calendarTypes';
import { CalendarHero } from './CalendarHero';
import { CalendarPageHeading } from './CalendarPageHeading';
import { CalendarCreateEventForm } from './CalendarCreateEventForm';
import { CalendarNotice } from './CalendarNotice';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarEventSections } from './CalendarEventSections';
import { getMonthEvents, getUpcomingEvents, isSameDay } from './calendarDateUtils';
import { useCalendarNavigation } from './useCalendarNavigation';
import { useCalendarRefresh } from './useCalendarRefresh';
import { useEventResponses } from './useEventResponses';

export function CalendarPage(props: CalendarScreenProps) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const notify = useCallback((next: Notice) => setNotice(next), []);
  const navigation = useCalendarNavigation();
  const refresh = useCalendarRefresh(props.canManage, props.onRefresh, notify);
  const responses = useEventResponses(props.onRespond, notify);
  const monthEvents = getMonthEvents(props.events, navigation.viewDate);
  const dayEvents = monthEvents.filter((event) => isSameDay(event.startsAt, navigation.selectedDay));
  const upcomingEvents = getUpcomingEvents(props.events);
  const nextEvent = upcomingEvents[0] ?? null;

  return (
    <Box className="calendar-page" style={styles.calendarPage}>
      <CalendarHero nextEvent={nextEvent} canManage={props.canManage} onShowEvent={navigation.showEventDate} />
      <CalendarPageHeading canManage={props.canManage} showCreateForm={showCreateForm} refreshing={refresh.refreshing} lastCheckedAt={refresh.lastCheckedAt} onRefresh={refresh.refreshNow} onToggleCreate={() => setShowCreateForm((visible) => !visible)} />
      {props.canManage && showCreateForm && <CalendarCreateEventForm songs={props.songs} onCreated={props.onEventCreated} onNotice={notify} onClose={() => setShowCreateForm(false)} />}
      <CalendarNotice notice={notice} />
      <CalendarMonthView date={navigation.viewDate} selectedDay={navigation.selectedDay} events={monthEvents} onSelectDay={navigation.setSelectedDay} onShift={navigation.shiftMonth} onToday={navigation.jumpToToday} />
      <CalendarEventSections selectedDay={navigation.selectedDay} dayEvents={dayEvents} upcomingEvents={upcomingEvents} songs={props.songs} canManage={props.canManage} busyEventId={responses.busyEventId} localResponses={responses.localResponses} onSaveSongs={props.onSaveSongs} onRespond={responses.saveResponse} />
    </Box>
  );
}
