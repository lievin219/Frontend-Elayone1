import type { EventDraft, EventFieldErrors } from './calendarTypes';

function hasValidDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
}

function hasValidDateTime(date: string, time: string) {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time) || !hasValidDate(date)) return false;
  const parsed = new Date(`${date}T${time}:00`);
  return !Number.isNaN(parsed.getTime());
}

export function validateEventDraft(draft: EventDraft): EventFieldErrors {
  const errors: EventFieldErrors = {};
  if (!draft.title.trim()) errors.title = 'Enter an event title.';
  if (!draft.location.trim()) errors.location = 'Enter the event location.';
  if (!draft.date) errors.date = 'Choose an event date.';
  else if (!hasValidDate(draft.date)) errors.date = 'Choose a valid event date.';
  if (!draft.startTime) errors.startTime = 'Choose a start time.';
  if (!draft.endTime) errors.endTime = 'Choose an end time.';
  if (draft.eventType === 'CUSTOM' && !draft.customEventType.trim()) {
    errors.customEventType = 'Name the custom event type.';
  }
  if (draft.date && draft.startTime && hasValidDate(draft.date) && !hasValidDateTime(draft.date, draft.startTime)) {
    errors.startTime = 'Choose a valid start time.';
  }
  if (draft.date && draft.endTime && hasValidDate(draft.date) && !hasValidDateTime(draft.date, draft.endTime)) {
    errors.endTime = 'Choose a valid end time.';
  }
  if (draft.date && draft.startTime && draft.endTime
      && hasValidDateTime(draft.date, draft.startTime)
      && hasValidDateTime(draft.date, draft.endTime)
      && Date.parse(`${draft.date}T${draft.endTime}:00`) <= Date.parse(`${draft.date}T${draft.startTime}:00`)) {
    errors.endTime = 'End time must be after the start time.';
  }
  return errors;
}
