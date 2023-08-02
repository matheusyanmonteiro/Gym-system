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
//--------------------------------------