import { authHeaders, request } from './client';
import type { MinistryTeam, Role, User } from './types';

export type DirectoryUser = User & {
  createdAt: string;
  memberships: Array<{ choirId: string; ministryTeam: MinistryTeam; availability: string }>;
};

export async function getAllUsers(): Promise<DirectoryUser[]> {
  return request<DirectoryUser[]>('/api/users', { headers: await authHeaders() });
}

export async function getChoirPeople(choirId: string) {
  return request<Array<{ id: string; availability: 'YES' | 'MAYBE' | 'NO' | 'PENDING'; ministryTeam: MinistryTeam; user: User }>>(`/api/choirs/${choirId}/people`, { headers: await authHeaders() });
}

export async function removeChoirMember(choirId: string, userId: string) {
  return request<void>(`/api/choirs/${choirId}/people/${userId}`, { method: 'DELETE', headers: await authHeaders() });
}

export async function updateUserRole(userId: string, role: Role) {
  return request<User>(`/api/users/${userId}/role`, { method: 'PATCH', headers: await authHeaders(), body: JSON.stringify({ role }) });
}

export async function resetUserPassword(userId: string, password: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/users/${userId}/password`, { method: 'PATCH', headers: await authHeaders(), body: JSON.stringify({ password }) });
}

export async function changeMyPassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
  return request<{ message: string }>('/api/me/password', { method: 'PATCH', headers: await authHeaders(), body: JSON.stringify({ currentPassword, newPassword }) });
}

export async function createMemberAccount(data: { name: string; email: string; password: string; ministryTeam: MinistryTeam }): Promise<DirectoryUser & { emailSent?: boolean }> {
  return request<DirectoryUser & { emailSent?: boolean }>('/api/users', { method: 'POST', headers: await authHeaders(), body: JSON.stringify(data) });
}

export async function updateMemberTeam(userId: string, choirId: string, ministryTeam: MinistryTeam) {
  return request<{ choirId: string; ministryTeam: MinistryTeam }>(`/api/users/${userId}/ministry-team`, {
    method: 'PATCH',
    headers: await authHeaders(),
    body: JSON.stringify({ choirId, ministryTeam }),
  });
}
