import { GymsRepositoryContract } from '@/repositories/gyms.repository';
import { CreateGymServiceRequest, CreateGymServiceResponse } from '../typings';

export class CreateGymService {
    constructor(private gymsRepository: GymsRepositoryContract) {}

    async handle({
        title,
        description,
        phone,
        longitude,
        latitude,
    }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            longitude,
            latitude,
        });

        return {
            gym,
        };
    }
}