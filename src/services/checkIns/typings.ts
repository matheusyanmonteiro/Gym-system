//----------- Check In SERVICE --------------

import { CheckIn } from '@prisma/client';

export interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export interface CheckInServiceResponse {
  checkIn: CheckIn;
}