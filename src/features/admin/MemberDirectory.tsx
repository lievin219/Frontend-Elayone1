import { useMemo, useState } from 'react';
import { ActionButton, Box, Icon, Label, Spinner, TextField } from '../../components/WebUI';
import { AdminForm } from '../../components/MinistryComponents';
import { COLORS, styles } from '../../theme';
import type { useMemberManagement } from './useMemberManagement';
import { MemberRow } from './MemberRow';

type Management = ReturnType<typeof useMemberManagement>;
type RoleFilter = 'ALL' | 'ADMIN' | 'LEADER' | 'MEMBER';

export function MemberDirectory({ management }: { management: Management }) {
  const { users, usersLoading, usersError, refreshUsers } = management;
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
      return matchesQuery && (roleFilter === 'ALL' || user.role === roleFilter);
    });
  }, [users, search, roleFilter]);

  return <Box className="admin-directory-panel"><AdminForm title="All registered users" icon="people-circle-outline">
    <Box className="admin-directory-summary">
      <Box className="admin-directory-count-wrap">
        <Label className="admin-directory-count">{users.length}</Label>
        <Box>
          <Label className="admin-directory-count-title">Ministry people</Label>
          <Label className="admin-directory-count-caption">A quick view of everyone in your community</Label>
        </Box>
      </Box>
      <ActionButton className="admin-directory-refresh" onPress={refreshUsers} accessibilityLabel="Refresh member list" disabled={usersLoading}>
        <Icon name="refresh-outline" size={17} color={COLORS.ink} />
        <Label>Refresh</Label>
      </ActionButton>
    </Box>
    {!usersLoading && !usersError && users.length > 0 && <>
      <Box className="admin-directory-search-wrap">
        <Icon name="search-outline" size={18} color="#888f92" />
        <TextField value={search} onChangeText={setSearch} placeholder="Search by name or email" placeholderTextColor="#899195" accessibilityLabel="Search registered users" />
        {search && <ActionButton className="admin-directory-clear" onPress={() => setSearch('')} accessibilityLabel="Clear search"><Icon name="close-circle" size={18} color="#aeb7bb" /></ActionButton>}
      </Box>
      <Box className="admin-directory-filters" accessibilityRole="group" accessibilityLabel="Filter users by role">
        {(['ALL', 'ADMIN', 'LEADER', 'MEMBER'] as const).map((filter) => {
          const count = filter === 'ALL' ? users.length : users.filter((user) => user.role === filter).length;
          return <ActionButton key={filter} className={`admin-role-filter${roleFilter === filter ? ' is-active' : ''}`} onPress={() => setRoleFilter(filter)} accessibilityRole="button" accessibilityState={{ selected: roleFilter === filter }}>
            <Label>{filter === 'ALL' ? 'Everyone' : filter === 'ADMIN' ? 'Admins' : filter === 'LEADER' ? 'Leaders' : 'Members'}</Label>
            <Label className="admin-role-filter-count">{count}</Label>
          </ActionButton>;
        })}
      </Box>
      <Label className="admin-directory-results">Showing {filteredUsers.length} of {users.length} {users.length === 1 ? 'person' : 'people'}</Label>
    </>}
    {usersLoading ? <Spinner color={COLORS.ink} /> : usersError ? <Box style={styles.userLoadError}>
      <Label style={styles.userLoadErrorText}>{usersError}</Label>
      <ActionButton style={styles.smallActionButton} onPress={refreshUsers} disabled={usersLoading}>
        <Label style={styles.smallActionText}>{usersLoading ? 'Loading...' : 'Try again'}</Label>
      </ActionButton>
    </Box> : users.length === 0 ? <Label style={styles.adminHelp}>No registered users yet.</Label> :
      filteredUsers.length === 0 ? <Box className="admin-directory-empty"><Icon name="search-outline" size={22} color="#84918d" /><Label>No people match this search.</Label><ActionButton onPress={() => { setSearch(''); setRoleFilter('ALL'); }}><Label>Clear filters</Label></ActionButton></Box> :
      <Box className="admin-member-list">{filteredUsers.map((user) => <MemberRow key={user.id} user={user} management={management} />)}</Box>}
  </AdminForm></Box>;
}
