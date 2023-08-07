import { InMemoryCheckInsRepositorye } from '@/repositories/in-memory/inMemoryCheckIns.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInService } from './checkIn.service';

let checkInsRepository: InMemoryCheckInsRepositorye;
let systemUnderTest: CheckInService;

describe('Check In Service', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepositorye();
        systemUnderTest = new CheckInService(checkInsRepository);
    });

    it ('should be able to check in'), async() => {
        const { checkIn } = await systemUnderTest.handle({
            gymId: 'gym_id',
            userId: 'user-id'
        });

        expect(checkIn.id).toEqual(expect.any(String));
    };
});