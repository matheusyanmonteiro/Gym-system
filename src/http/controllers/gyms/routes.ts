import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/hooks/verifyJwt';
import { searchController } from './search.controller';
import { nearByController } from './nearby.controller';
import { createController } from './create.controller';

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.get('/gyms/search', searchController);
    app.get('/gym/nearby', nearByController);

    app.post('/gyms',createController);
}