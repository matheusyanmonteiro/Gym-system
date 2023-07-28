import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { RegisterServiceRequest } from './Iregister.service';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';


export async function registerService({
    name,
    email,
    password
}: RegisterServiceRequest) {

    const password_hash = await hash(password, 6);
  
    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    });
   
    if ( userWithSameEmail ) {
        throw new Error('E-MAIL already exists. ');
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
        name,
        email,
        password_hash,
    });
}