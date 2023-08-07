import { CheckInsRepository } from '@/repositories/checkIns.repository';
import { CheckInServiceRequest, CheckInServiceResponse } from '../typings';
import { GymsRepository } from '@/repositories/gyms.repository';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';

export class CheckInService {
    constructor(
        private checkInRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}

    async handle ({
        userId,
        gymId
    }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        //calculate the distance between user and gym.
        
        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date(),
        );

        if (checkInOnSameDay) {
            throw new Error();
        }

        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        });

        return {
            checkIn,
        };
    }
}   