import { beforeEach, describe, expect, it} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/inMemoryUsers.repository';
import { GetUserProfileService } from './getUserProfile.service';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';


let usersRepositoryInMemory: InMemoryUsersRepository;
let systemUnderTest: GetUserProfileService;

describe('Get User Profile Service', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        systemUnderTest = new GetUserProfileService(usersRepositoryInMemory);
    });   

    it('Should be able to get user profile', async() => {
        const createdUser = await usersRepositoryInMemory.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6) //## creation of user for test the method remember the hash method its works with 6 rounds
        });

        const { user } = await systemUnderTest.handle({
            userId: createdUser.id
        }); 

        expect(user.name).toEqual('John Doe');
    });

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => systemUnderTest.handle({
            userId: 'non-existing-id',
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});