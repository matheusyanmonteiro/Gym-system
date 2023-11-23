import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prisma } from '@/lib/prisma';

describe('Validate Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to validate a check-in ', async () => {
        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: 'Test Gym',
                latitude: -15.9370869,
                longitude: -48.0307621,
            }
        });

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id
            }
        });

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(204);

        checkIn = await prisma.checkIn.findFirstOrThrow({
            where: {
                id: checkIn.id,
            }
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));
        
    });
});