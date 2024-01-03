import { FastifyInstance } from 'fastify';
import { registerController } from './register.controller';
import { authenticateController } from './authenticate.controller';
import { profileController } from './profile.controller';
import { verifyJWT } from '../../hooks/verifyJwt';
import { refreshController } from './refresh.controller';


export async function usersRoutes(app: FastifyInstance) {
    //**service running status */
    app.get('/marco', (request, reply) => {
        return reply.status(200).send('polo');
    });

    app.post('/users', registerController);
    app.post('/sessions', authenticateController);

    //refreshToken 
    app.patch ('/token/refresh', refreshController);
    //** Authenticated  routes*/
    app.get('/me', { onRequest: [verifyJWT] }, profileController);
}

