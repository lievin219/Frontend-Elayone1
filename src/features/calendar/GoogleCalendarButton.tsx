import { useEffect, useState } from 'react';
import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { Rehearsal } from '../../types';
import { addEventToGoogleCalendar, isGoogleCalendarConfigured, loadGoogleIdentity } from './googleCalendarClient';

type GoogleCalendarButtonProps = {
  event: Rehearsal;
};

export function GoogleCalendarButton({ event }: GoogleCalendarButtonProps) {
  const [ready, setReady] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isGoogleCalendarConfigured) return;
    loadGoogleIdentity().then(() => setReady(true)).catch((failure: unknown) => {
      setError(failure instanceof Error ? failure.message : 'Google authorization could not be loaded.');
    });
  }, []);

  async function addToCalendar() {
    setError('');
    setAdding(true);
    try {
      await addEventToGoogleCalendar(event);
      setAdded(true);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Google Calendar could not add this event.');
    } finally {
      setAdding(false);
    }
  }

  return (
    <Box style={{ alignItems: 'flex-start' }}>
      <ActionButton
        style={[styles.calendarGoogleAction, added && styles.calendarGoogleActionAdded]}
        onPress={() => void addToCalendar()}
        disabled={!ready || adding || added || !isGoogleCalendarConfigured}
        accessibilityLabel={`${added ? 'Added' : 'Add'} ${event.title} ${added ? 'to' : 'directly to'} your Google Calendar`}
        title={!isGoogleCalendarConfigured ? 'Set VITE_GOOGLE_CLIENT_ID to enable Google Calendar' : undefined}
      >
        <Icon name="calendar-outline" size={15} color="#ffffff" />
        <Label style={styles.calendarGoogleActionText}>
          {!isGoogleCalendarConfigured ? 'Google Calendar not configured' : added ? 'Added to Google Calendar' : adding ? 'Adding to Google Calendar…' : ready ? 'Add to Google Calendar' : 'Loading Google Calendar…'}
        </Label>
      </ActionButton>
      {error && <Label style={styles.calendarGoogleError} accessibilityRole="alert">{error}</Label>}
      {isGoogleCalendarConfigured && <Label style={styles.calendarGoogleHint}>First use asks you to allow Elayone to add events to the Google account you choose.</Label>}
    </Box>
  );
}
