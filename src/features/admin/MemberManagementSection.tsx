import type { useMemberManagement } from './useMemberManagement';
import { MemberAccountForm } from './MemberAccountForm';
import { MemberDirectory } from './MemberDirectory';

type Management = ReturnType<typeof useMemberManagement>;

export function MemberManagementSection({ management }: { management: Management }) {
  return <>
    <MemberDirectory management={management} />
    <MemberAccountForm management={management} />
  </>;
}
