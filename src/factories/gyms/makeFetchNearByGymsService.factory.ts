import { PrismaGymsRepository } from '@/repositories/prisma/prismaGyms.repository';
import { FetchNearbyGymsService } from '@/services/gyms/fetchNearbyGymsService/fetchNearbyGyms.service';

export function MakeFetchNearByGymsService() {
    const gymsRepository = new PrismaGymsRepository();
    const service = new FetchNearbyGymsService(gymsRepository);

    return service;
}