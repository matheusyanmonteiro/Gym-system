import { InMemoryCheckInsRepository } from '@/repositories/in-memory/inMemoryCheckIns.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserMetricsService } from './getUserMetrics.service';


let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTest: GetUserMetricsService;

describe('Get User Metrics Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        systemUnderTest = new GetUserMetricsService(checkInsRepository);
    });

    it('should be able to get check-ins count from metrics', async () => {
        for(let i = 1; i <= 10; i++){
            await checkInsRepository.create({
                gym_id: `gym_${i}`,
                user_id: 'user_01'
            });
        }

        const { checkInsCount } = await systemUnderTest.handle({
            userId: 'user_01'
        });

        expect(checkInsCount).toEqual(10);
    });

});