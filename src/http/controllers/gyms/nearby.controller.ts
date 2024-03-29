
import { MakeFetchNearByGymsService } from '@/factories/gyms/makeFetchNearByGymsService.factory';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';



export async function nearByController (request:FastifyRequest, reply:FastifyReply )  {
    const nearByGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { 
        latitude,
        longitude, } = nearByGymsQuerySchema.parse(request.query);

   
    const fetchNearByGymsService = MakeFetchNearByGymsService();
        
    const { gyms } = await fetchNearByGymsService.handle({
        userLatitude: latitude,
        userLongitude: longitude,
    });


    return reply.status(200).send({
        gyms,
    });
}   