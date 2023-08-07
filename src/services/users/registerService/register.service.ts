import { hash } from 'bcryptjs';

import { UserAlreadyExistsError } from './errors/userAlreadyExists.error';
import { RegisterServiceRequest, RegisterServiceResponse } from '../typings';
import { UsersRepositoryContract } from '@/repositories/users.repository';


export class RegisterService {
    constructor(private usersRepository: UsersRepositoryContract) {}

    async handle({
        name,
        email,
        password
    }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    
        const password_hash = await hash(password, 6);
      
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
       
        if ( userWithSameEmail ) {
            throw new UserAlreadyExistsError();
        }
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return { 
            user,
        };
    }
}