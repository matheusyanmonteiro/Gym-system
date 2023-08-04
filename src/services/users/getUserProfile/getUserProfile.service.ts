import { compare } from 'bcryptjs';
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository';
import { GetUserProfileRequest, GetUserProfileResponse } from '../typings';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';

export class GetUserProfileService {
    constructor (
    private usersRepository: PrismaUsersRepository
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