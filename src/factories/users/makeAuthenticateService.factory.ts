import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository';
import { AuthenticateService } from '@/services/users/authenticaateService/authentica.service';

export function makeAuthenticateService() {
    const usersRepository = new PrismaUsersRepository();
    const service = new AuthenticateService(usersRepository);

    return service;
}