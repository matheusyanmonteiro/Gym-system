import { hash } from 'bcryptjs';
import { RegisterServiceRequest, RegisterServiceResponse } from '../typings';
import { IUsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';


export class RegisterService {
    constructor(private usersRepository: IUsersRepository) {}

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