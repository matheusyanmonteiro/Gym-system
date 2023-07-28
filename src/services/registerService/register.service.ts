import { hash } from 'bcryptjs';
import { RegisterServiceRequest } from '../typings';
import { IUsersRepository } from '@/repositories/users-repository';


export class RegisterService {
    constructor(private usersRepository: IUsersRepository) {}

    async handle({
        name,
        email,
        password
    }: RegisterServiceRequest) {
    
        const password_hash = await hash(password, 6);
      
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
       
        if ( userWithSameEmail ) {
            throw new Error('E-MAIL already exists. ');
        }
    
        await this.usersRepository.create({
            name,
            email,
            password_hash,
        });
    }
}