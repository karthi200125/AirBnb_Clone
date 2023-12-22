import { User } from "@prisma/client";

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailverified'> & {
    createdAt: string,
    updatedAt: string,
    emailverified: string,
};
