import { Prisma, User } from '@prisma/client';
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
