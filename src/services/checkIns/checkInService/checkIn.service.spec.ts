import { InMemoryCheckInsRepository } from '@/repositories/in-memory/inMemoryCheckIns.repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInService } from './checkIn.service';
import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGyms.repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxDistanceError } from './errors/maxDistance.error';
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckins.error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let systemUnderTest: CheckInService;

describe('Check In Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        systemUnderTest = new CheckInService(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id:'gym_01',
            title: 'types_gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0
        });
        
        
        //mock
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in', async () => {
        const { checkIn } = await systemUnderTest.handle({
            gymId: 'gym_01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
    
        });
    
        expect(checkIn.id).toEqual(expect.any(String));
    });

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
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
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

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Types_gym',
            description: '' ,
            phone: '',
            latitude: new Decimal(-15.9307762),
            longitude: new Decimal(-48.0391709)
        });
        
        await expect(() => 
            systemUnderTest.handle({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -15.9400957,
                userLongitude: -48.0360534,
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError);
    });

});