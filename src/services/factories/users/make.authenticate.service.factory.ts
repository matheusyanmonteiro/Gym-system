import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '@/services/users/authenticaateService/authentica.service';

export function makeAuthenticateService() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    return authenticateService;
}