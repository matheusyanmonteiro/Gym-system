import { GymsRepositoryContract } from '@/repositories/gyms.repository';
import { FetchNearbyGymsServiceRequest, FetchNearbyGymsServiceResponse } from '../typings';

export class FetchNearbyGymsService {
    constructor (private gymsRepository: GymsRepositoryContract) {}

    async handle({
        userLatitude,
        userLongitude,
    }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        });

        return {
            gyms,
        };
    }
}