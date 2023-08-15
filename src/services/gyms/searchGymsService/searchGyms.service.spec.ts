import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGyms.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsService } from './searchGyms.service';

let gymsRepository: InMemoryGymsRepository;
let systemUnderTest: SearchGymsService;

describe('Search Gyms Service', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        systemUnderTest = new SearchGymsService(gymsRepository);
    });

    it('should be able to search a list of gyms', async () => {
        await gymsRepository.create({
            title: 'Test 01 Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        });

        await gymsRepository.create({
            title: 'Test 02 Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        });

        const { gyms } = await systemUnderTest.handle({
            query: 'Test 01 Gym',
            page: 1
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({title: 'Test 01 Gym'})]);
    });
  
    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 23; i++) {
            await gymsRepository.create({
                title: `Test ${i} Gym`,
                description: null,
                phone: null,
                latitude: 0,
                longitude: 0,
            });
        }

        const { gyms } = await systemUnderTest.handle({
            query: 'Test',
            page: 2
        });

        expect(gyms).toHaveLength(3);
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Test 21 Gym'}),
            expect.objectContaining({title: 'Test 22 Gym'}),
            expect.objectContaining({title: 'Test 23 Gym'}),
        ]);
    });
});