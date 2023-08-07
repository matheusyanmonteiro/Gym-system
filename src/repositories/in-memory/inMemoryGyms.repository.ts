import { Gym } from '@prisma/client';
import { GymsRepositoryContract } from '../gyms.repository';

export class InMemoryGymsRepository implements GymsRepositoryContract {
    public items: Gym[] = [];

    async findById(id: string){
        const gym = this.items.find((item) => item.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }
}