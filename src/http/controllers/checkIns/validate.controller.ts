
import { MakeValidateCheckInsService } from '@/factories/checkIns/makeValidateCheckIns.factory';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function validateController (request:FastifyRequest, reply:FastifyReply )  {
    const validateCheckInsParamsSchema = z.object({
        checkInId: z.string().uuid(),
    });

    const { checkInId } = validateCheckInsParamsSchema.parse(request.params);

    const checkInService = MakeValidateCheckInsService();
        
    await checkInService.handle({
        checkInId,
    });

    return reply.status(204).send();
}   