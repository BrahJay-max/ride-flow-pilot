import React, { useState, useEffect } from 'react';
import { useDriver } from '@/hooks/use-driver-state';
import { Ride } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, User, DollarSign, Clock, Navigation } from 'lucide-react';

export const RideRequestModal: React.FC = () => {
  const { acceptRide } = useDriver();
  const [request, setRequest] = useState<Ride | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const handleNewRide = (e: any) => {
      if (!request) {
        setRequest(e.detail);
        setTimeLeft(15);
      }
    };
    window.addEventListener('newRideRequest', handleNewRide);
    return () => window.removeEventListener('newRideRequest', handleNewRide);
  }, [request]);

  useEffect(() => {
    if (request && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setRequest(null);
    }
  }, [request, timeLeft]);

  if (!request) return null;

  return (
    <Dialog open={!!request} onOpenChange={() => setRequest(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            New Ride Request
          </DialogTitle>
          <DialogDescription>
            A passenger is looking for a ride nearby.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <span className="font-bold text-lg">₵</span>
              </div>
              <div>
                <p className="text-sm font-medium">Estimated Fare</p>
                <p className="text-xl font-bold">GHS {request.fare.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Distance</p>
              <p className="text-lg font-semibold">{request.distance}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 rounded-full border-2 border-primary" />
                <div className="w-0.5 h-8 bg-border" />
                <MapPin className="h-4 w-4 text-destructive" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs text-muted-foreground">PICKUP</p>
                  <p className="text-sm font-medium">{request.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">DROPOFF</p>
                  <p className="text-sm font-medium">{request.dropoffLocation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{request.customerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{request.duration}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setRequest(null)} className="flex-1">
            Decline
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              acceptRide(request);
              setRequest(null);
            }}
          >
            Accept ({timeLeft}s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};