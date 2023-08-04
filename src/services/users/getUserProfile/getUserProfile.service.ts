import { compare } from 'bcryptjs';
import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsers.repository';
import { GetUserProfileRequest, GetUserProfileResponse } from '../typings';

export class GetUserProfileService {
    constructor (
    private usersRepository: PrismaUsersRepository
    ) {}

    async handle({userId}: GetUserProfileRequest): Promise<void> {
        const user = this.usersRepository.findByEmail('xxxx@email.com');
    }
}