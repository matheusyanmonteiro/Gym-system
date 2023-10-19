import { CheckInsRepositoryContract } from '@/repositories/checkIns.repository';
import { ValidateCheckInServiceResponse, ValidateCheckInUseCaseServiceRequest } from '../typings';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './error/lateCheckInValidation.error';

export class ValidateCheckInService {
    constructor(private checkInsRepository: CheckInsRepositoryContract) {}

    async handle({
        checkInId,
    }:ValidateCheckInUseCaseServiceRequest ): Promise<ValidateCheckInServiceResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError;
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        );

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }
 
        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return {
            checkIn
        };
    }
}