import { CheckInsRepositoryContract } from '@/repositories/checkIns.repository';
import { GetUserMetricsServiceRequest, GetUserMetricsServiceResponse } from '../typings';

export class GetUserMetricsService {
    constructor(private CheckInsRepository: CheckInsRepositoryContract) {}

    async handle({ userId }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
        const checkInsCount = await this.CheckInsRepository.countByUserId(userId);

        return {
            checkInsCount,
        };
    }
}