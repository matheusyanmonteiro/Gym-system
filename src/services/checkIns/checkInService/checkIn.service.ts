import { CheckInsRepository } from '@/repositories/checkInsRepository';
import { CheckInServiceRequest, CheckInServiceResponse } from '../typings';

export class CheckInService {
    constructor(private checkInRepository: CheckInsRepository) {}

    async handle ({
        userId,
        gymId
    }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        });

        return {
            checkIn,
        };
    }
}