import { Notification, Role } from '@prisma/client';
import { Prisma } from '@prisma/client';
import * as z from 'zod';
import { getAuthUserDetails, getUserPermissions } from './queries';

export const AgencyDetailsFormSchema = z.object({
  name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
  companyEmail: z.string().email(),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
});

export type AgencyDetailsFormType = z.infer<typeof AgencyDetailsFormSchema>;

export const SubAccountDetailsFormSchema = z.object({
  name: z.string(),
  companyEmail: z.string(),
  companyPhone: z.string().min(1),
  address: z.string(),
  city: z.string(),
  subAccountLogo: z.string(),
  zipCode: z.string(),
  state: z.string(),
  country: z.string(),
});

export type SubAccountDetailsFormType = z.infer<
  typeof SubAccountDetailsFormSchema
>;

export type NotificationWithUser =
  | ({
      User: {
        id: string;
        name: string;
        avatarUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        agencyId: string | null;
      };
    } & Notification)[]
  | undefined;

export type AuthUserWithAgencySigebarOptionsSubAccounts =
  Prisma.PromiseReturnType<typeof getAuthUserDetails>;

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>;

export const userDataFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  avatarUrl: z.string(),
  role: z.enum([
    'AGENCY_OWNER',
    'AGENCY_ADMIN',
    'SUBACCOUNT_USER',
    'SUBACCOUNT_GUEST',
  ]),
});

export type UserDataFormType = z.infer<typeof userDataFormSchema>;
