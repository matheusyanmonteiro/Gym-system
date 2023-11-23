
import { MakeFetchUserCheckInsHistoryService } from '@/factories/checkIns/makeFetchUserCheckInsHistoryService.factory';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function historyController (request:FastifyRequest, reply:FastifyReply )  {
    const hystoryCheckinsQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page, } = hystoryCheckinsQuerySchema.parse(request.query);

    const fetchUserCheckInsHistoryService = MakeFetchUserCheckInsHistoryService();
        
    const { checkIns } = await fetchUserCheckInsHistoryService.handle({
        userId: request.user.sub,
        page,
    });

    return reply.status(200).send({
        checkIns,
    });
}   