import { CheckInsRepositoryContract } from '@/repositories/checkIns.repository';
import { GetUserMetricsServiceRequest, GetUserMetricsServiceResponse } from '../typings';

export class GetUserMetricsService {
    constructor(private CheckInsRepository: CheckInsRepositoryContract) {}

    async handle({ userId }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
        throw new Error('does not implements');
    }
}