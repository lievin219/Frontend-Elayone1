import { createContext, useContext } from 'react';
import type { useApplicationState } from './useApplicationState';

export type ApplicationState = ReturnType<typeof useApplicationState>;
export const ApplicationContext = createContext<ApplicationState | null>(null);

export function useApplication() {
  const state = useContext(ApplicationContext);
  if (!state) throw new Error('Application components must be rendered inside ApplicationContext.');
  return state;
}
