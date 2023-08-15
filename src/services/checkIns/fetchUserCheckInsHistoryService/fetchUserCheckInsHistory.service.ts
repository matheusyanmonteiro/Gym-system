import { CheckInsRepositoryContract } from '@/repositories/checkIns.repository';
import { FetchUserCheckInsHistoryServiceRequest, FetchUserCheckInsHistoryServiceResponse } from '../typings';

export class FetchUserCheckInsHistoryService {
    constructor(private checkInsRepository: CheckInsRepositoryContract) {}

    async handle({
        userId,
        page
    }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

        return {
            checkIns,
        };
    }
}