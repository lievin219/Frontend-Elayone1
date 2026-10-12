import { Spinner, Box } from './components/WebUI';
import { AuthScreen } from './features/AuthScreen';
import { AuthenticatedApp } from './features/app/AuthenticatedApp';
import { ApplicationContext } from './features/app/ApplicationContext';
import { useApplicationState } from './features/app/useApplicationState';
import { COLORS, styles } from './theme';

export default function App() {
  const application = useApplicationState();

  if (!application.auth.authReady) {
    return <Box style={styles.loadingScreen}><Spinner color={COLORS.ink} /></Box>;
  }

  if (!application.auth.session) {
    return <AuthScreen onAuthenticated={(session) => {
      application.auth.authenticate(session);
      application.navigation.setActiveTab('Home');
      application.notifications.setShow(false);
    }} />;
  }

  return (
    <ApplicationContext.Provider value={application}>
      <AuthenticatedApp />
    </ApplicationContext.Provider>
  );
}
