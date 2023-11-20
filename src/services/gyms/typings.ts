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

export interface SearchGymsServiceRequest {
  query: string;
  page: number;
}

export interface SearchGymsServiceResponse {
  gyms: Gym[]
}

export interface FetchNearbyGymsServiceRequest {
  userLatitude: number,
  userLongitude: number,
}

export interface FetchNearbyGymsServiceResponse {
  gyms: Gym[]
}