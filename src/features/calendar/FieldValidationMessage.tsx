import { Label } from '../../components/WebUI';
import { styles } from '../../theme';

export function FieldValidationMessage({ message }: { message?: string }) {
  return message ? <Label accessibilityRole="alert" style={styles.eventSongError}>{message}</Label> : null;
}
