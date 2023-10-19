import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckIns.repository';
import { FetchUserCheckInsHistoryService } from '@/services/checkIns/fetchUserCheckInsHistoryService/fetchUserCheckInsHistory.service';

export function MakeFetchUserCheckInsHistoryService() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const service = new FetchUserCheckInsHistoryService(checkInsRepository);

    return service;
    
}