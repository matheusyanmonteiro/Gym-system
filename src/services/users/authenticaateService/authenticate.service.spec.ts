import { expect, describe, it, beforeEach } from 'vitest';
import { AuthenticateService } from './authentica.service';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalidCrendentials.error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/inMemoryUsers.repository';


//mock
let usersRepositoryInMemory: InMemoryUsersRepository;
let systemUnderTest: AuthenticateService;

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository;
        systemUnderTest = new AuthenticateService(usersRepositoryInMemory);
    });

    it('should be able to authenticate', async () => {
        //## creation of user for test the method remember the hash method its works with 6 rounds
        await usersRepositoryInMemory.create({
            name: 'John doe',
            email: 'jhondoe@example.com',
            password_hash: await hash('123456', 6),
        });

        const { user } = await systemUnderTest.handle({
            email: 'jhondoe@example.com',
            password: '123456'
        });


        expect(user.id).toEqual(expect.any(String));

    });
    
    it('should not be able to authenticate with wrong email', async () => {
        expect(() =>  systemUnderTest.handle({
            email: 'johndoe@example.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);

    });

    it('should not be able to authenticate with wrong password', async () => {
        //## creation of user for test the method remember the hash method its works with 6 rounds
        await usersRepositoryInMemory.create({
            name: 'John doe',
            email: 'jhondoe@example.com',
            password_hash: await hash('123456', 6),
        });


        expect(() =>  systemUnderTest.handle({
            email: 'johndoe@example.com',
            password: '123123'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);

    });
});