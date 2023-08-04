import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/register.controller';
import { authenticateController } from './controllers/authenticate.controller';


export async function appRoutes(app: FastifyInstance) {

    app.post('/users', registerController);
    app.post('/sessions', authenticateController);
    
    app.get('/', (request, reply) => {
        return reply.status(200).send('rota de teste do serviço');
    });

}