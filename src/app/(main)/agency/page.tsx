import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import { Plan } from '@prisma/client';
import { redirect } from 'next/navigation';

interface AgencyPageProps {
  searchParams: {
    plan: Plan;
    state: string;
    code: string;
  };
}

const AgencyPage = async ({ searchParams }: AgencyPageProps) => {
  const agencyId = await verifyAndAcceptInvitation();

  //get the users details
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') {
      return redirect('/subaccount');
    }

    if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }

      if (searchParams.state) {
        const statePath = searchParams.state.split('___')[0];
        const stateAgencyId = searchParams.state.split('___')[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not authorized</div>;
    }
  }

  return (
    <div className='flex justify-center items-center mt-4'>
      <div className='max-w-[850px] border-[1px] p-4 rounded-xl'>
        <h1 className='text-4xl'>Create An Agency</h1>
        {/* TODO: add form for agency creation */}
      </div>
    </div>
  );
};

export default AgencyPage;
