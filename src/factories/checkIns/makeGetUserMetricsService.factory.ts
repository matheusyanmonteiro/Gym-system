import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckIns.repository';
import { GetUserMetricsService } from '@/services/checkIns/getUserMetricsService/getUserMetrics.service';

export function MakeGetUserMetricsService() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const service = new GetUserMetricsService(checkInsRepository);

    return service;
}