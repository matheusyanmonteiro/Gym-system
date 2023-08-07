import { describe, expect, it } from 'vitest';


describe('Get a test for not result', () => {
    it ('should be return a number 200'), async() => {
        const someNumber = 200;

        expect(someNumber).toEqual(200);
    };
});