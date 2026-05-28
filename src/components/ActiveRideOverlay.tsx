import React from 'react';
import { useDriver } from '@/hooks/use-driver-state';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActiveRideOverlay: React.FC = () => {
  const { currentRide, updateRideStatus, completeRide } = useDriver();

  if (!currentRide) return null;

  const getStatusText = () => {
    switch (currentRide.status) {
      case 'accepted': return 'Heading to Pickup';
      case 'pickup': return 'Heading to Destination';
      case 'dropping': return 'Arrived at Destination';
      default: return '';
    }
  };

  const getNextAction = () => {
    switch (currentRide.status) {
      case 'accepted': return { text: 'I have Picked Up', next: 'pickup' as const };
      case 'pickup': return { text: 'Arrived at Destination', next: 'dropping' as const };
      case 'dropping': return { text: 'Complete Ride', next: 'completed' as const };
      default: return null;
    }
  };

  const action = getNextAction();

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-8 md:bottom-8 md:w-96"
    >
      <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
              Active Ride
            </Badge>
            <span className="text-sm font-medium text-primary flex items-center gap-1">
              <Navigation className="h-3 w-3 animate-pulse" />
              {getStatusText()}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
              {currentRide.customerName[0]}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{currentRide.customerName}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {currentRide.status === 'accepted' ? currentRide.pickupLocation : currentRide.dropoffLocation}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-muted/50 rounded-xl">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Distance</p>
              <p className="text-sm font-semibold">{currentRide.distance}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-xl">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Earning</p>
              <p className="text-sm font-semibold text-green-600">GHS {currentRide.fare.toFixed(2)}</p>
            </div>
          </div>

          <Button 
            className="w-full py-6 text-lg font-bold shadow-lg" 
            onClick={() => {
              if (action?.next === 'completed') {
                completeRide();
              } else if (action?.next) {
                updateRideStatus(action.next);
              }
            }}
          >
            {action?.text}
            {action?.next === 'completed' ? <CheckCircle2 className="ml-2 h-5 w-5" /> : <Navigation className="ml-2 h-5 w-5" />}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};