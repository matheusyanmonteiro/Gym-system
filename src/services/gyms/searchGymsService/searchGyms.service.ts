import { GymsRepositoryContract } from '@/repositories/gyms.repository';
import { SearchGymsServiceRequest, SearchGymsServiceResponse } from '../typings';

export class SearchGymsService {
    constructor(private gymsRepository: GymsRepositoryContract) {}

    async handle({
        query,
        page,
    }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
        const gyms = await this.gymsRepository.searchMany(query, page);

        return {
            gyms,
        };
    }
}