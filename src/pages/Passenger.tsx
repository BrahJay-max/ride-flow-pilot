import React, { useState } from 'react';
import { useApp } from '@/hooks/use-driver-state';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Search, 
  Clock, 
  Star, 
  ShieldCheck, 
  History,
  X,
  Phone,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Passenger: React.FC = () => {
  const { requestRide, passengerRide, cancelPassengerRide, passengerHistory } = useApp();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    requestRide(pickup, dropoff, 25.50);
  };

  const getStatusMessage = () => {
    switch (passengerRide?.status) {
      case 'pending': return 'Finding your driver...';
      case 'accepted': return 'Driver is on the way';
      case 'pickup': return 'Driver has arrived';
      case 'dropping': return 'On your way to destination';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Passenger Mode</h1>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
          Passenger Mode Active
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        {!passengerRide ? (
          <motion.div
            key="request-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <CardTitle>Where to?</CardTitle>
                <CardDescription>Enter your pickup and destination to see available rides</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                      <Input 
                        id="pickup" 
                        placeholder="e.g., Central Park West" 
                        className="pl-10 h-12"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoff">Destination</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                      <Input 
                        id="dropoff" 
                        placeholder="e.g., JFK Airport Terminal 4" 
                        className="pl-10 h-12"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button type="button" variant="outline" className="h-20 flex flex-col gap-2 border-2 border-primary/20 hover:border-primary bg-background">
                      <Car className="h-6 w-6 text-primary" />
                      <div className="text-xs">
                        <p className="font-bold">Economy</p>
                        <p className="text-muted-foreground">$25.50</p>
                      </div>
                    </Button>
                    <Button type="button" variant="outline" className="h-20 flex flex-col gap-2 border-2 border-transparent hover:border-primary bg-background opacity-50">
                      <ShieldCheck className="h-6 w-6 text-indigo-600" />
                      <div className="text-xs">
                        <p className="font-bold">Premium</p>
                        <p className="text-muted-foreground">$42.00</p>
                      </div>
                    </Button>
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg font-bold">
                    Request Ride
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" />
                Recent Places
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {setPickup('Work'); setDropoff('Home');}}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors text-left"
                >
                  <div className="p-3 bg-background rounded-xl">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Home</p>
                    <p className="text-xs text-muted-foreground">123 Broadway, Brooklyn</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
                <button 
                  onClick={() => {setPickup('Home'); setDropoff('Office');}}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors text-left"
                >
                  <div className="p-3 bg-background rounded-xl">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-bold">Office</p>
                    <p className="text-xs text-muted-foreground">450 Park Avenue, Manhattan</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active-ride"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-6"
          >
            <Card className="border-none shadow-2xl overflow-hidden">
              <div className="bg-primary p-6 text-primary-foreground flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{getStatusMessage()}</h2>
                  <p className="text-sm opacity-80">Ride ID: {passengerRide.id}</p>
                </div>
                {passengerRide.status === 'pending' && (
                  <Button variant="destructive" size="sm" onClick={cancelPassengerRide} className="h-8">
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                )}
              </div>
              <CardContent className="p-0">
                {passengerRide.driver ? (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={passengerRide.driver.avatar} 
                        className="h-16 w-16 rounded-2xl object-cover border-4 border-muted"
                        alt="Driver"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{passengerRide.driver.name}</h3>
                        <p className="text-sm text-muted-foreground">{passengerRide.driver.vehicle} • {passengerRide.driver.plate}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-bold">{passengerRide.driver.rating}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="rounded-full">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full border-2 border-primary" />
                          <div className="w-0.5 h-6 bg-border" />
                          <MapPin className="h-3 w-3 text-destructive" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div>
                            <p className="text-[10px] text-muted-foreground font-bold">PICKUP</p>
                            <p className="text-sm font-medium">{passengerRide.pickup}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground font-bold">DESTINATION</p>
                            <p className="text-sm font-medium">{passengerRide.dropoff}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-sm font-medium">Economy Ride</span>
                      <span className="text-lg font-bold">${passengerRide.fare.toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Matching you with a nearby driver...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-none shadow-md">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold">SAFETY</p>
                    <p className="text-sm font-bold">Verified</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Navigation className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold">ETA</p>
                    <p className="text-sm font-bold">4 mins</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Past Trips</h2>
        {passengerHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No trip history yet.</p>
        ) : (
          passengerHistory.map(ride => (
            <Card key={ride.id} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Navigation className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{ride.dropoff}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(ride.timestamp).toLocaleDateString()} • {ride.status}
                    </p>
                  </div>
                </div>
                <p className="font-bold">${ride.fare.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Passenger;