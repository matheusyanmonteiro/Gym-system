import { MakeGetUserProfileService } from '@/factories/users/makeGetUserProfileService.factory';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function profileController( request: FastifyRequest, reply: FastifyReply) {
    const getUserProfile = MakeGetUserProfileService();

    const { user } = await getUserProfile.handle({
        userId: request.user.sub,
    });

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
        },
    });
}