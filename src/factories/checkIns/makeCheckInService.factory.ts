import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckIns.repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGyms.repository';
import { CheckInService } from '@/services/checkIns/checkInService/checkIn.service';

export function MakeCheckInService() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const service = new CheckInService(checkInsRepository, gymsRepository);

    return service;
}
