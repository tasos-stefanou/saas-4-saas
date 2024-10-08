import { Prisma, SubAccount, User } from '@prisma/client';
import { db } from './db';

type GetAgencyDetailsResult = [
  Prisma.AgencyGetPayload<{ include: { SubAccount: true } }> | null,
  unknown | null
];

export const getAgencyDetails = async (
  agencyId: string
): Promise<GetAgencyDetailsResult> => {
  try {
    const agencyDetails = await db.agency.findUnique({
      where: { id: agencyId },
      include: {
        SubAccount: true,
      },
    });
    console.log('[AGENCY_DETAILS]', agencyDetails);
    return [agencyDetails, null];
  } catch (error) {
    console.log('[GET_AGENCY_DETAILS_ERROR]', error);
    return [null, error];
  }
};

export const getUserDetailsByEmail = async (
  email: string
): Promise<[User | null, unknown | null]> => {
  try {
    const userDetails = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return [userDetails, null];
  } catch (error) {
    console.log('[GET_USER_DETAILS_ERROR]', error);
    return [null, error];
  }
};

export const getSubaccountDetails = async (
  subaccountId: string
): Promise<[SubAccount | null, unknown | null]> => {
  try {
    const response = await db.subAccount.findUnique({
      where: {
        id: subaccountId,
      },
    });
    return [response, null];
  } catch (error) {
    console.log('[GET_SUBACCOUNT_DETAILS_ERROR]', error);
    return [null, error];
  }
};

export const deleteSubAccount = async (
  subaccountId: string
): Promise<[string | null, unknown | null]> => {
  try {
    const response = await db.subAccount.delete({
      where: {
        id: subaccountId,
      },
    });
    return ['success', null];
  } catch (error) {
    console.log('[DELETE_SUBACCOUNT_ERROR]', error);
    return [null, error];
  }
};
