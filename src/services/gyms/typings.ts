import { Gym } from '@prisma/client';

export interface CreateGymServiceRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export interface CreateGymServiceResponse {
  gym: Gym
}