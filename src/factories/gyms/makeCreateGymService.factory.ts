import { PrismaGymsRepository } from '@/repositories/prisma/prismaGyms.repository';
import { CreateGymService } from '@/services/gyms/createGymService/createGym.service';

export function MakeCreateGymService() {
    const gymsRepository = new PrismaGymsRepository();
    const service = new CreateGymService(gymsRepository);

    return service;
}