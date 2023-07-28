export class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-MAIL already exists.');
    }
}