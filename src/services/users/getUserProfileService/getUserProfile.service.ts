import { UsersRepositoryContract } from '@/repositories/users.repository';
import { GetUserProfileRequest, GetUserProfileResponse } from '../typings';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';

export class GetUserProfileService {
    constructor (
    private usersRepository: UsersRepositoryContract
    ) {}

    async handle({userId}: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const user  = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user,
        };
    }
}