import type { Dispatch, SetStateAction } from 'react';
import type { DirectoryUser } from '../../api';

export type AdminNotice = { type: 'success' | 'error'; text: string };
export type NoticeSetter = (notice: AdminNotice | null) => void;
export type BusyState = [boolean, Dispatch<SetStateAction<boolean>>];
export type UserState = [DirectoryUser[], Dispatch<SetStateAction<DirectoryUser[]>>];
