import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/hooks/verifyJwt';
import { searchController } from './search.controller';
import { nearByController } from './nearby.controller';
import { createController } from './create.controller';
import { VerifyUserRole } from '@/http/hooks/verify.UserRole';

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.get('/gyms/search', searchController);
    app.get('/gyms/nearby', nearByController);

    app.post('/gyms',{ onRequest: [VerifyUserRole('ADMIN')] },createController);
}