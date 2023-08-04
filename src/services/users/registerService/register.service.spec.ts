import { beforeEach, describe, expect, it} from 'vitest';
import { RegisterService } from './register.service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/userAlreadyExists.error';

//mock 
let usersRepositoryInMemory: InMemoryUsersRepository;
let systemUnderTest: RegisterService;

describe('Register Service', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository;
        systemUnderTest = new RegisterService(usersRepositoryInMemory);
    });

    it('Should be able to register', async() => {
        const {user} = await systemUnderTest.handle({
            name: 'Jhoe dony',
            email: 'jhoe1@example.com',
            password: '123456'
        });
        expect(user.id).toEqual(expect.any(String));
    });

    it('Should hash user password upon registration', async() => {
        const {user} = await systemUnderTest.handle({
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
        const email = 'johndoe@example.com';

        await systemUnderTest.handle({
            name: 'Jhoe dony',
            email: email,
            password: '123456'
        });


        await expect(() => systemUnderTest.handle({
            name: 'Jhoe dony',
            email: email,
            password: '123456'
        }),).rejects.toBeInstanceOf(UserAlreadyExistsError); 
    });
});