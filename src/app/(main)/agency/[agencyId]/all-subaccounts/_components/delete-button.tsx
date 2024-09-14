'use client';
import { useToast } from '@/components/ui/use-toast';
import { deleteSubAccount, getSubaccountDetails } from '@/lib/data-access';
import { saveActivityLogsNotification } from '@/lib/queries';
import { useRouter } from 'next/navigation';

type Props = {
  subaccountId: string;
};

const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleUnsuccessfulDelete = () => {
    toast({
      variant: 'destructive',
      title: 'Oppse!',
      description: 'Could not delete the subaccount',
    });
  };

  const handleDelete = async () => {
    const [response, getSubaccountDetailsError] = await getSubaccountDetails(
      subaccountId
    );
    const [deleteSuccess, deleteSubAccountError] = await deleteSubAccount(
      subaccountId
    );
    if (deleteSubAccountError || getSubaccountDetailsError)
      handleUnsuccessfulDelete();

    await saveActivityLogsNotification({
      agencyId: undefined,
      description: `Deleted a subaccount | ${response?.name}`,
      subaccountId,
    });
    router.refresh();
  };

  return (
    <div className='text-white' onClick={handleDelete}>
      Delete Sub Account
    </div>
  );
};

export default DeleteButton;
