import React from 'react';
import { useDriver } from '@/hooks/use-driver-state';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Clock,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const History: React.FC = () => {
  const { rides } = useDriver();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trip History</h1>
          <p className="text-muted-foreground">Review your past completed rides</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips, locations..." className="pl-10 h-12 bg-muted/30 border-none shadow-sm focus-visible:ring-primary" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {rides.length === 0 ? (
          <Card className="border-none shadow-md bg-muted/20 border-2 border-dashed border-border">
            <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <Navigation className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">No trips yet</h3>
                <p className="text-muted-foreground max-w-xs">
                  Your completed rides will appear here. Go online to start accepting rides!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          rides.map((ride, index) => (
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-5 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {ride.customerName[0]}
                          </div>
                          <div>
                            <h4 className="font-bold">{ride.customerName}</h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(ride.timestamp).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">${ride.fare.toFixed(2)}</p>
                          <Badge variant="outline" className="text-[10px] text-green-600 bg-green-50 border-green-100">
                            Completed
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
                        <div className="flex gap-3 items-start relative z-10">
                          <div className="mt-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                          <div className="flex-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Pickup</p>
                            <p className="text-sm font-medium">{ride.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start relative z-10">
                          <MapPin className="h-3.5 w-3.5 text-destructive fill-destructive/10" />
                          <div className="flex-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Dropoff</p>
                            <p className="text-sm font-medium">{ride.dropoffLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-5 md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border">
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Distance</p>
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm font-semibold">{ride.distance}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Duration</p>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm font-semibold">{ride.duration}</span>
                          </div>
                        </div>
                      </div>
                      <button className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;