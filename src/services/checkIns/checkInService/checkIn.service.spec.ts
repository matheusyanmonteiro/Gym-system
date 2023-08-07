import { InMemoryCheckInsRepository } from '@/repositories/in-memory/inMemoryCheckIns.repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInService } from './checkIn.service';
import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGyms.repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let systemUnderTest: CheckInService;

describe('Check In Service', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        systemUnderTest = new CheckInService(checkInsRepository, gymsRepository);

        // lazy entry for entity because i'm tired 
        gymsRepository.items.push({
            id:'gym_01',
            title: 'types_gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        });
        
        
        //mock
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in'), async() => {
        const { checkIn } = await systemUnderTest.handle({
            gymId: 'gym_01',
            userId: 'user-id',
            userLatitude: 0,
            userLongitude: 0

        });

        expect(checkIn.id).toEqual(expect.any(String));
    };

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

        await systemUnderTest.handle({
            gymId: 'gym_01',
            userId: 'user_01',
            userLatitude: 0,
            userLongitude: 0

        });

        await expect(()=> 
            systemUnderTest.handle({
                gymId: 'gym_01',
                userId: 'user_01',
                userLatitude: 0,
                userLongitude: 0
            }),
        ).rejects.toBeInstanceOf(Error);
    });

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
        
        await systemUnderTest.handle({
            gymId: 'gym_01',
            userId: 'user_01',
            userLatitude: 0,
            userLongitude: 0
        });

        vi.setSystemTime(new Date(2023, 0, 22, 8, 0, 0));

        const { checkIn } = await systemUnderTest.handle({
            gymId: 'gym_01',
            userId: 'user_01',
            userLatitude: 0,
            userLongitude: 0
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});