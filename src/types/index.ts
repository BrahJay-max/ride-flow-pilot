export type RideStatus = 'pending' | 'accepted' | 'pickup' | 'dropping' | 'completed' | 'cancelled';

export interface Ride {
  id: string;
  customerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  fare: number;
  distance: string;
  duration: string;
  status: RideStatus;
  timestamp: string;
}

export interface DriverStats {
  todayEarnings: number;
  todayTrips: number;
  todayHours: number;
  rating: number;
  acceptanceRate: number;
}

export interface DriverProfile {
  name: string;
  avatar: string;
  vehicle: {
    model: string;
    plate: string;
    image: string;
    color: string;
  };
}

export interface EarningsData {
  day: string;
  amount: number;
}

export interface PassengerRide {
  id: string;
  pickup: string;
  dropoff: string;
  status: RideStatus;
  fare: number;
  driver?: {
    name: string;
    vehicle: string;
    plate: string;
    rating: number;
    avatar: string;
  };
  timestamp: string;
}

export interface WalletTransaction {
  id: string;
  type: 'load' | 'deduction';
  amount: number;
  description: string;
  timestamp: string;
}