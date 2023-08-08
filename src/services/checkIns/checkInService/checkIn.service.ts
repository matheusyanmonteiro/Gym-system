import { CheckInsRepositoryContract } from '@/repositories/checkIns.repository';
import { CheckInServiceRequest, CheckInServiceResponse } from '../typings';
import { GymsRepositoryContract } from '@/repositories/gyms.repository';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates';

export class CheckInService {
    constructor(
        private checkInRepository: CheckInsRepositoryContract,
        private gymsRepository: GymsRepositoryContract,
    ) {}

    async handle ({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()},
        );
        
        const MAX_DISTANCE_IN_KILOMETERS = 0.1;
        
        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error();
        }
        
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