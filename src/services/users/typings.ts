import type { User } from '@prisma/client';

export interface RegisterServiceRequest{
  name: string;
  email: string;
  password: string;
}

export interface RegisterServiceResponse {
  user: User
}

export interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export interface AuthenticateServiceResponse {
  user: User
}

export interface GetUserProfileRequest {
  userId: string;
}

export interface GetUserProfileResponse {
  user: User;
}
