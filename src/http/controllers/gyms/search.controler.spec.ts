import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Search Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to search gyms ', async () => {
        const { token } = await createAndAuthenticateUser(app, true);

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'maia gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -15.9370869,
                longitude: -48.0307621,
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Matiusa de cebola gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -15.9370869,
                longitude: -48.0307621,
            });

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'Matiusa'
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Matiusa de cebola gym'
            })
        ]);
    });
});