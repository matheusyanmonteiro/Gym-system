import { Gym } from '@prisma/client';

export interface GymsRepositoryContract {
  findById(id: string): Promise<Gym | null>;
}