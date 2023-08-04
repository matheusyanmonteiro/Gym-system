import type { User } from '@prisma/client';

//----------- User SERVICE ----------
export interface RegisterServiceRequest{
  name: string;
  email: string;
  password: string;
}


export interface RegisterServiceResponse {
  user: User
}
//-------------------------------------------
//----------- authenticate SERVICE ----------

export interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export interface AuthenticateServiceResponse {
  user: User
}
//-------------------------------------------
//----------- getUserProfile SERVICE --------
export interface GetUserProfileRequest {
  userId: string;
}

export interface GetUserProfileResponse {
  user: User;
}