import { PrismaGymsRepository } from '@/repositories/prisma/prismaGyms.repository';
import { SearchGymsService } from '@/services/gyms/searchGymsService/searchGyms.service';

export function MakeSearchGymsService() {
    const gymsRepository = new PrismaGymsRepository();
    const service = new SearchGymsService(gymsRepository);

    return service;
}