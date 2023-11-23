import { MakeGetUserMetricsService } from '@/factories/checkIns/makeGetUserMetricsService.factory';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function metricsController (request:FastifyRequest, reply:FastifyReply )  {
    const getUserMetricsService = MakeGetUserMetricsService();
        
    const { checkInsCount } = await getUserMetricsService.handle({
        userId: request.user.sub
    });

    return reply.status(200).send({
        checkInsCount,
    });
}   