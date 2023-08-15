import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGyms.repository';
import { CreateGymService } from './createGym.service';
import { describe, expect, it, beforeEach } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
let systemUnderTest: CreateGymService;

describe('Create a gym service', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        systemUnderTest = new CreateGymService(gymsRepository);
    });

    it('should be able to create a new gym', async () => {
        const { gym } = await systemUnderTest.handle({
            title: 'gym apolo',
            description: 'boxer gym',
            phone: '(11) 1111-1111',
            longitude: 0,
            latitude: 0,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});