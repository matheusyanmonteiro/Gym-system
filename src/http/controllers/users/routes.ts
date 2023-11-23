import { FastifyInstance } from 'fastify';
import { registerController } from './register.controller';
import { authenticateController } from './authenticate.controller';
import { profileController } from './profile.controller';
import { verifyJWT } from '../../hooks/verifyJwt';


export async function usersRoutes(app: FastifyInstance) {

    app.post('/users', registerController);
    app.post('/sessions', authenticateController);

    //** Authenticated  routes*/
    app.get('/me', { onRequest: [verifyJWT] }, profileController);

    //**service running status */
    app.get('/marco', (request, reply) => {
        return reply.status(200).send('polo');
    });
}