import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckIns.repository';
import { ValidateCheckInService } from '@/services/checkIns/validateCheckIns/validateCheckIn.service';

export function MakeValidateCheckInsService() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const service = new ValidateCheckInService(checkInsRepository);

    return service;
}