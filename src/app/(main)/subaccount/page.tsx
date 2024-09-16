import Unauthorized from '@/components/unauthorized';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { redirect } from 'next/navigation';

type SubAccountMainPageProps = {
  // these will come from stripe,
  // state: is subaccount id
  // code: is stripe code
  searchParams: { state: string; code: string };
};

const SubAccountMainPage = async ({
  searchParams,
}: SubAccountMainPageProps) => {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) {
    return <Unauthorized />;
  }

  const user = await getAuthUserDetails();
  if (!user) return;

  const getFirstSubaccountWithAccess = user.Permissions.find(
    (permission) => permission.access === true
  );

  const getSearchParamsData = (): {
    statePath: string;
    stateSubaccountId: string;
  } => {
    const statePath = searchParams.state.split('___')[0];
    const stateSubaccountId = searchParams.state.split('___')[1];
    return { statePath, stateSubaccountId };
  };

  if (searchParams.state) {
    const { statePath, stateSubaccountId } = getSearchParamsData();

    if (!stateSubaccountId) return <Unauthorized />;

    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`
    );
  }

  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`);
  }

  return <Unauthorized />;
};

export default SubAccountMainPage;
