
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterService } from '@/services/registerService/register.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';


export async function registerController (request:FastifyRequest, reply:FastifyReply )  {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const {name, email, password } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const registerService = new RegisterService(prismaUsersRepository);
        
        await registerService.handle({
            name,
            email,
            password
        });

    } catch (err) {
        return reply.status(409).send();
    }

    return reply.status(201).send();
}   