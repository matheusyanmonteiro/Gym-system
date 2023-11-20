import { UsersRepositoryContract } from '@/repositories/users.repository';
import { AuthenticateServiceRequest, AuthenticateServiceResponse } from '../typings';
import { InvalidCredentialsError } from './errors/invalidCrendentials.error';
import { compare } from 'bcryptjs';

export class AuthenticateService {
    constructor (
    private usersRepository: UsersRepositoryContract
    ) {}

    async handle({email, password}: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const user  = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user,
        };
    }
}