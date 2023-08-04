import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository';
import { RegisterService } from '@/services/users/registerService/register.service';

export function MakeRegisterService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    return registerService;
}