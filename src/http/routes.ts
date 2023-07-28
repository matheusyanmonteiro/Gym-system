import { FastifyInstance } from 'fastify';
import { registerController } from './controllers/register.controller';

export async function appRoutes(app: FastifyInstance) {

    app.post('/users', registerController);
    
    app.get('/', (request, reply) => {
        return reply.status(200).send('rota de teste do serviço');
    });

}