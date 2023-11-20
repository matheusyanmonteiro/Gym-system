import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/register.controller';
import { authenticateController } from './controllers/authenticate.controller';
import { profileController } from './controllers/profile.controller';
import { verifyJWT } from './hooks/verifyJwt';


export async function appRoutes(app: FastifyInstance) {

    app.post('/users', registerController);
    app.post('/sessions', authenticateController);

    //** Authenticated  routes*/
    app.get('/me', { onRequest: [verifyJWT] }, profileController);

    //**service running status */
    app.get('/marco', (request, reply) => {
        return reply.status(200).send('polo');
    });
}