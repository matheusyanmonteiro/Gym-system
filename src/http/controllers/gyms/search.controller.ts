
import { MakeSearchGymsService } from '@/factories/gyms/makeSearchGymsService.factory';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';



export async function searchController (request:FastifyRequest, reply:FastifyReply )  {
    const searchGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    });

    const { 
        query,
        page, } = searchGymsQuerySchema.parse(request.query);

   
    const searchGymsService = MakeSearchGymsService();
        
    const { gyms } = await searchGymsService.handle({
        query,
        page,
    });


    return reply.status(200).send({
        gyms,
    });
}   