import { makeAuthenticateService } from '@/factories/users/makeAuthenticateService.factory';
import { InvalidCredentialsError } from '@/services/users/authenticateService/errors/invalidCrendentials.error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';



export async function authenticateController (request:FastifyRequest, reply:FastifyReply )  {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateService = makeAuthenticateService();
        
        const { user } =  await authenticateService.handle({
            email,
            password
        });

        const token = await reply.jwtSign({}, {
            sign: {sub: user.id}
        });

        return reply.status(200).send({
            token,
        });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({message: err.message});
        }

        throw err;
    }
}   