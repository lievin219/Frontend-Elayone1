import type { CalendarEventCardProps } from './calendarTypes';
import { EventAttendanceSummary } from './EventAttendanceSummary';
import { MemberAvailabilityButtons } from './MemberAvailabilityButtons';

export function EventAttendance(props: CalendarEventCardProps) {
  if (props.canManage) return <EventAttendanceSummary event={props.event} />;
  const canRespond = props.event.invited !== false && Date.parse(props.event.endsAt) >= Date.now();
  if (!canRespond) return null;
  return <MemberAvailabilityButtons event={props.event} response={props.response} busy={props.busy} onRespond={props.onRespond} />;
}
