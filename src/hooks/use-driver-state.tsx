import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Ride, DriverStats, DriverProfile, EarningsData, PassengerRide, WalletTransaction } from '@/types';
import { toast } from 'sonner';

interface AppContextType {
  // Driver State
  isOnline: boolean;
  toggleOnline: () => void;
  stats: DriverStats;
  profile: DriverProfile;
  rides: Ride[];
  currentRide: Ride | null;
  earningsHistory: EarningsData[];
  acceptRide: (ride: Ride) => void;
  updateRideStatus: (status: Ride['status']) => void;
  completeRide: () => void;
  updateProfile: (profile: Partial<DriverProfile>) => void;
  
  // Wallet State
  walletBalance: number;
  loadWallet: (amount: number) => void;
  walletHistory: WalletTransaction[];

  // Settings State
  navigationApp: string;
  setNavigationApp: (app: string) => void;

  // Passenger State
  passengerRide: PassengerRide | null;
  requestRide: (pickup: string, dropoff: string, fare: number) => void;
  cancelPassengerRide: () => void;
  passengerHistory: PassengerRide[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_PROFILE: DriverProfile = {
  name: "Alex Johnson",
  avatar: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/bbce89d5-3a26-4c69-a908-fe847fc9caad/driver-avatar-5ad2ca78-1779934419929.webp",
  vehicle: {
    model: "Tesla Model 3",
    plate: "ABC-1234",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/bbce89d5-3a26-4c69-a908-fe847fc9caad/vehicle-image-9d7a9e0a-1779934419947.webp",
    color: "Pearl White"
  }
};

const MOCK_EARNINGS: EarningsData[] = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 95 },
  { day: 'Wed', amount: 150 },
  { day: 'Thu', amount: 110 },
  { day: 'Fri', amount: 180 },
  { day: 'Sat', amount: 210 },
  { day: 'Sun', amount: 140 },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Persistence Wrapper ---
  const getStored = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // --- Driver State ---
  const [isOnline, setIsOnline] = useState(() => getStored('isOnline', false));
  const [stats, setStats] = useState<DriverStats>(() => getStored('driverStats', {
    todayEarnings: 0,
    todayTrips: 0,
    todayHours: 0,
    rating: 4.9,
    acceptanceRate: 98
  }));
  const [profile, setProfile] = useState<DriverProfile>(() => getStored('driverProfile', MOCK_PROFILE));
  const [rides, setRides] = useState<Ride[]>(() => getStored('ridesHistory', []));
  const [currentRide, setCurrentRide] = useState<Ride | null>(() => getStored('currentRide', null));

  // --- Wallet State ---
  const [walletBalance, setWalletBalance] = useState(() => getStored('walletBalance', 50));
  const [walletHistory, setWalletHistory] = useState<WalletTransaction[]>(() => getStored('walletHistory', []));

  // --- Settings State ---
  const [navigationApp, setNavigationApp] = useState(() => getStored('navigationApp', 'Google Maps'));

  // --- Passenger State ---
  const [passengerRide, setPassengerRide] = useState<PassengerRide | null>(() => getStored('passengerRide', null));
  const [passengerHistory, setPassengerHistory] = useState<PassengerRide[]>(() => getStored('passengerHistory', []));

  useEffect(() => {
    localStorage.setItem('isOnline', JSON.stringify(isOnline));
    localStorage.setItem('driverStats', JSON.stringify(stats));
    localStorage.setItem('driverProfile', JSON.stringify(profile));
    localStorage.setItem('ridesHistory', JSON.stringify(rides));
    localStorage.setItem('currentRide', JSON.stringify(currentRide));
    localStorage.setItem('walletBalance', JSON.stringify(walletBalance));
    localStorage.setItem('walletHistory', JSON.stringify(walletHistory));
    localStorage.setItem('navigationApp', JSON.stringify(navigationApp));
    localStorage.setItem('passengerRide', JSON.stringify(passengerRide));
    localStorage.setItem('passengerHistory', JSON.stringify(passengerHistory));
  }, [isOnline, stats, profile, rides, currentRide, walletBalance, walletHistory, navigationApp, passengerRide, passengerHistory]);

  const toggleOnline = useCallback(() => {
    if (!isOnline && walletBalance <= 0) {
      toast.error("Insufficient wallet balance. Please load GHS to go online.");
      return;
    }
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    toast(newStatus ? "You are now online and ready for rides" : "You are now offline");
  }, [isOnline, walletBalance]);

  const loadWallet = useCallback((amount: number) => {
    setWalletBalance(prev => prev + amount);
    const transaction: WalletTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'load',
      amount,
      description: 'Wallet top-up',
      timestamp: new Date().toISOString()
    };
    setWalletHistory(prev => [transaction, ...prev]);
    toast.success(`GHS ${amount.toFixed(2)} successfully loaded to your wallet.`);
  }, []);

  const acceptRide = useCallback((ride: Ride) => {
    const acceptedRide = { ...ride, status: 'accepted' as const };
    setCurrentRide(acceptedRide);
    toast.success("Ride accepted! Head to pickup location.");
  }, []);

  const updateRideStatus = useCallback((status: Ride['status']) => {
    if (currentRide) {
      setCurrentRide({ ...currentRide, status });
      if (status === 'pickup') toast.info("Passenger picked up. Driving to destination.");
      if (status === 'dropping') toast.info("Arrived at destination.");
    }
  }, [currentRide]);

  const completeRide = useCallback(() => {
    if (currentRide) {
      const commission = currentRide.fare * 0.10;
      const completedRide = { ...currentRide, status: 'completed' as const, timestamp: new Date().toISOString() };
      
      setRides(prev => [completedRide, ...prev]);
      setStats(prev => ({
        ...prev,
        todayEarnings: prev.todayEarnings + currentRide.fare,
        todayTrips: prev.todayTrips + 1
      }));
      
      setWalletBalance(prev => {
        const newBalance = Math.max(0, prev - commission);
        if (newBalance <= 0) {
          setIsOnline(false);
          toast.warning("Wallet balance exhausted. You have been taken offline.");
        }
        return newBalance;
      });

      const transaction: WalletTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'deduction',
        amount: commission,
        description: `Commission for trip ${currentRide.id}`,
        timestamp: new Date().toISOString()
      };
      setWalletHistory(prev => [transaction, ...prev]);

      setCurrentRide(null);
      toast.success(`Ride completed! GHS ${commission.toFixed(2)} (10%) commission deducted.`);
    }
  }, [currentRide]);

  const updateProfile = useCallback((newProfile: Partial<DriverProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
    toast.success("Profile updated successfully");
  }, []);

  // --- Passenger Actions ---
  const requestRide = useCallback((pickup: string, dropoff: string, fare: number) => {
    const newRide: PassengerRide = {
      id: Math.random().toString(36).substr(2, 9),
      pickup,
      dropoff,
      fare,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setPassengerRide(newRide);
    toast.success("Ride requested! Looking for nearby drivers...");

    setTimeout(() => {
      setPassengerRide(prev => prev ? {
        ...prev,
        status: 'accepted',
        driver: {
          name: "James Miller",
          vehicle: "Toyota Camry",
          plate: "XYZ-789",
          rating: 4.8,
          avatar: "https://i.pravatar.cc/150?u=james"
        }
      } : null);
      toast.success("Driver found! James is on his way.");
    }, 5000);

    setTimeout(() => {
      setPassengerRide(prev => prev ? { ...prev, status: 'pickup' } : null);
      toast.info("Driver has arrived at your pickup location.");
    }, 12000);

    setTimeout(() => {
      setPassengerRide(prev => prev ? { ...prev, status: 'dropping' } : null);
      toast.info("You are on your way to " + dropoff);
    }, 20000);

    setTimeout(() => {
      setPassengerRide(prev => {
        if (!prev) return null;
        const completed = { ...prev, status: 'completed' as const };
        setPassengerHistory(history => [completed, ...history]);
        return null;
      });
      toast.success("You have arrived! Hope you had a great ride.");
    }, 30000);
  }, []);

  const cancelPassengerRide = useCallback(() => {
    if (passengerRide) {
      const cancelled = { ...passengerRide, status: 'cancelled' as const };
      setPassengerHistory(prev => [cancelled, ...prev]);
      setPassengerRide(null);
      toast.error("Ride request cancelled.");
    }
  }, [passengerRide]);

  useEffect(() => {
    if (isOnline && !currentRide) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const newRide: Ride = {
            id: Math.random().toString(36).substr(2, 9),
            customerName: ["John Doe", "Sarah Smith", "Mike Ross", "Rachel Zane"][Math.floor(Math.random() * 4)],
            pickupLocation: "Downtown Central Park",
            dropoffLocation: "Airport Terminal 2",
            fare: Math.floor(Math.random() * 30) + 10,
            distance: (Math.random() * 10 + 2).toFixed(1) + " miles",
            duration: Math.floor(Math.random() * 20 + 10) + " min",
            status: 'pending',
            timestamp: new Date().toISOString()
          };
          window.dispatchEvent(new CustomEvent('newRideRequest', { detail: newRide }));
        }
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [isOnline, currentRide]);

  return (
    <AppContext.Provider value={{
      isOnline,
      toggleOnline,
      stats,
      profile,
      rides,
      currentRide,
      earningsHistory: MOCK_EARNINGS,
      acceptRide,
      updateRideStatus,
      completeRide,
      updateProfile,
      walletBalance,
      loadWallet,
      walletHistory,
      navigationApp,
      setNavigationApp,
      passengerRide,
      requestRide,
      cancelPassengerRide,
      passengerHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const useDriver = useApp;
export const DriverProvider = AppProvider;