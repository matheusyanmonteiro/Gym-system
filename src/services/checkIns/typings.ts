//----------- Check In SERVICE --------------

import { CheckIn } from '@prisma/client';

export interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

export interface CheckInServiceResponse {
  checkIn: CheckIn;
}