import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';

export function ApplicationError({ message, onRetry }: { message: string; onRetry: () => void }) {
  if (!message) return null;
  return <Box style={styles.dataLoadError}>
    <Label style={styles.dataLoadErrorText}>{message}</Label>
    <ActionButton style={styles.dataLoadRetry} onPress={onRetry}>
      <Label style={styles.dataLoadRetryText}>Retry</Label>
    </ActionButton>
  </Box>;
}
