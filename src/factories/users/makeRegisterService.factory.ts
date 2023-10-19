import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository';
import { RegisterService } from '@/services/users/registerService/register.service';

export function MakeRegisterService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const service = new RegisterService(prismaUsersRepository);

    return service;
}