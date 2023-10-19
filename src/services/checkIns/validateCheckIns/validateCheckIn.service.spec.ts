import { InMemoryCheckInsRepository } from '@/repositories/in-memory/inMemoryCheckIns.repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ValidateCheckInService } from './validateCheckIn.service';
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error';
import { LateCheckInValidationError } from './error/lateCheckInValidation.error';

let checkInsRepository :InMemoryCheckInsRepository;
let systemUnderTest :ValidateCheckInService;

describe('Validate Check Ins Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        systemUnderTest = new ValidateCheckInService(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to validate the check-in', async () => {
        const createCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });

        const { checkIn } = await systemUnderTest.handle({
            checkInId: createCheckIn.id
        });


        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    });

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() => systemUnderTest.handle({
            checkInId: 'inexistent-check-in-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to validate the check-in after 20 minutes of its create', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });

        const twentyOneMinutesInMs = 1000 * 60 * 21;
        
        vi.advanceTimersByTime(twentyOneMinutesInMs);

        await expect(() => systemUnderTest.handle({
            checkInId: createdCheckIn.id,
        })
        ).rejects.toBeInstanceOf(LateCheckInValidationError);
    });
});