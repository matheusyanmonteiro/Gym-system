import { describe, expect, it} from 'vitest';
import { RegisterService } from './register.service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Service', () => {
    it('Should be able to register', async() => {
        const usersRepositoryInMemory = new InMemoryUsersRepository;
        const registerService = new RegisterService(usersRepositoryInMemory);


        const {user} = await registerService.handle({
            name: 'Jhoe dony',
            email: 'jhoe1@example.com',
            password: '123456'
        });
        expect(user.id).toEqual(expect.any(String));
    });

    it('Should hash user password upon registration', async() => {
        const usersRepositoryInMemory = new InMemoryUsersRepository;
        const registerService = new RegisterService(usersRepositoryInMemory);


        const {user} = await registerService.handle({
            name: 'Jhoe dony',
            email: 'jhoe1@example.com',
            password: '123456'
        });

        const isPasswordCorrectlyHashed = await compare(
            '123456', 
            user.password_hash
        );


        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('Should not be able to register  with same email twice', async() => {
        const usersRepositoryInMemory = new InMemoryUsersRepository;
        const registerService = new RegisterService(usersRepositoryInMemory);

        const email = 'johndoe@example.com';

        await registerService.handle({
            name: 'Jhoe dony',
            email: email,
            password: '123456'
        });


        await expect(() => registerService.handle({
            name: 'Jhoe dony',
            email: email,
            password: '123456'
        }),).rejects.toBeInstanceOf(UserAlreadyExistsError); 
    });
});