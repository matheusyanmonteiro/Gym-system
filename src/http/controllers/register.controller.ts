
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { MakeRegisterService } from '@/services/factories/users/make.register.service.factory';
import { UserAlreadyExistsError } from '@/services/users/registerService/errors/user-already-exists-error';


export async function registerController (request:FastifyRequest, reply:FastifyReply )  {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const {name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerService = MakeRegisterService();
        
        await registerService.handle({
            name,
            email,
            password
        });

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({message: err.message});
        }

        throw err;
    }

    return reply.status(201).send();
}   