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

export interface FetchUserCheckInsHistoryServiceRequest {
  userId:string;
  page: number;
}

export interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export interface GetUserMetricsServiceRequest {
  userId: string;
}

export interface GetUserMetricsServiceResponse {
  checkInsCount: number;
}

export interface ValidateCheckInUseCaseServiceRequest {
  checkInId: string;
}

export interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}