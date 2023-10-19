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

//----------- Fetch User Check Ins History Service -----------

export interface FetchUserCheckInsHistoryServiceRequest {
  userId:string;
  page: number;
}

export interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}



//----------- Get User Metrics Service ------------------

export interface GetUserMetricsServiceRequest {
  userId: string;
}

export interface GetUserMetricsServiceResponse {
  checkInsCount: number;
}

//------------------- Valide Check Ins--------------------

export interface ValidateCheckInUseCaseServiceRequest {
  checkInId: string;
}

export interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}