
import { MakeCheckInService } from '@/factories/checkIns/makeCheckInService.factory';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';



export async function createController (request:FastifyRequest, reply:FastifyReply )  {
    const createCheckInParamschema = z.object({
        gymId: z.string().uuid(),
    });

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value => {
            return Math.abs(value) <= 180;
        }))
    });

    const { gymId } = createCheckInParamschema.parse(request.params);

    const { 
        latitude,
        longitude } = createCheckInBodySchema.parse(request.body);
    
    const checkInService = MakeCheckInService();
        
    await checkInService.handle({
        gymId,
        userId: request.user.sub,
        userLatitude:latitude,
        userLongitude:longitude,
    });


    return reply.status(201).send();
}   