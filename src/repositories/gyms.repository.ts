import { Gym, Prisma } from '@prisma/client';
import { FindManyNearbyParams } from './params/FindManyNearbyParams';

export interface GymsRepositoryContract {
  findById(id: string): Promise<Gym | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}