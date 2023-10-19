import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository';
import { GetUserProfileService } from '@/services/users/getUserProfileService/getUserProfile.service';

export function MakeGetUserProfileService() {
    const usersRepository = new PrismaUsersRepository();
    const service = new GetUserProfileService(usersRepository);

    return service;
}