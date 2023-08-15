import { InMemoryCheckInsRepository } from '@/repositories/in-memory/inMemoryCheckIns.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserMetricsService } from './getUserMetrics.service';


let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTest: GetUserMetricsService;

describe('Fetch User Check-In History Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        systemUnderTest = new GetUserMetricsService(checkInsRepository);
    });


    it('should be able to fetch check-in history', async () => {
        console.log('hello world');
    });

});