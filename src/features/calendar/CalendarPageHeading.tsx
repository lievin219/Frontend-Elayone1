import { ActionButton, Box, Icon, Label, Spinner } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';

type CalendarPageHeadingProps = {
  canManage: boolean;
  showCreateForm: boolean;
  refreshing: boolean;
  lastCheckedAt: Date;
  onRefresh: () => void;
  onToggleCreate: () => void;
};

export function CalendarPageHeading({ canManage, showCreateForm, refreshing, lastCheckedAt, onRefresh, onToggleCreate }: CalendarPageHeadingProps) {
  return (
    <>
      <Label className="responsive-eyebrow" style={styles.calendarPageEyebrow}>ELAYONE / SCHEDULE</Label>
      <Label className="responsive-page-title" style={styles.calendarPageTitle}>Ministry calendar</Label>
      <Label className="responsive-body-copy" style={styles.calendarPageCaption}>{canManage ? 'Add events, choose songs, and see who can attend.' : 'See your events and reply with your availability.'}</Label>
      {canManage && <Box style={[styles.calendarResponseHeader, styles.calendarDarkResponseHeader]}>
        <Label style={styles.calendarResponseHeaderText}>Responses update automatically · checked {lastCheckedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Label>
        <ActionButton style={[styles.calendarRefreshButton, styles.calendarDarkRefreshButton]} onPress={onRefresh} disabled={refreshing} accessibilityLabel="Refresh event responses">
          {refreshing ? <Spinner size="small" color={COLORS.ink} /> : <Icon name="refresh-outline" size={17} color={COLORS.ink} />}
        </ActionButton>
      </Box>}
      {canManage && <ActionButton style={[styles.addButton, styles.calendarDarkAddButton]} onPress={onToggleCreate}>
        <Icon name={showCreateForm ? 'close' : 'add'} size={19} color="#111111" />
        <Label style={styles.calendarDarkAddButtonText}>{showCreateForm ? 'Cancel event' : 'Add event to calendar'}</Label>
      </ActionButton>}
    </>
  );
}
