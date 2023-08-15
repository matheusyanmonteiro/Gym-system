import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGyms.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsService } from './fetchNearbyGyms.service';

let gymsRepository: InMemoryGymsRepository;
let systemUnderTest: FetchNearbyGymsService;

describe('Fetch Nearby Gyms Service', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        systemUnderTest = new FetchNearbyGymsService(gymsRepository);
    });

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near 01 Gym',
            description: null,
            phone: null,
            latitude: -15.9460432,
            longitude: -48.0353522,
        });

        await gymsRepository.create({
            title: 'Near 02 Gym',
            description: null,
            phone: null,
            latitude: -15.9483504,
            longitude: -48.0358115,
        });

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -15.5997678,
            longitude: -47.8738138,
        });

        const { gyms } = await systemUnderTest.handle({
            userLatitude: -15.9483504,
            userLongitude: -48.0358115,
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near 01 Gym'}),
            expect.objectContaining({title: 'Near 02 Gym'}),
        ]);
    });
});