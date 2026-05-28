import React, { useState, useEffect } from 'react';
import { useDriver } from '@/hooks/use-driver-state';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  MapPin, 
  Star, 
  TrendingUp, 
  Car, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Navigation,
  Wallet,
  Plus,
  AlertCircle,
  LocateFixed
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard: React.FC = () => {
  const { isOnline, toggleOnline, stats, profile, currentRide, walletBalance, loadWallet } = useDriver();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [loadAmount, setLoadAmount] = useState('');

  const handleLoad = () => {
    const amount = parseFloat(loadAmount);
    if (isNaN(amount) || amount <= 0) return;
    loadWallet(amount);
    setLoadAmount('');
    setIsWalletOpen(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Top Bar / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile.name}</p>
        </div>
        
        <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl border border-border">
          <div className="flex items-center gap-2 px-3">
            <span className={cn(
              "h-2.5 w-2.5 rounded-full",
              isOnline ? "bg-green-500 animate-pulse" : "bg-slate-400"
            )} />
            <span className="text-sm font-semibold">{isOnline ? "Online" : "Offline"}</span>
          </div>
          <Switch 
            checked={isOnline} 
            onCheckedChange={toggleOnline}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Wallet Balance Card */}
        <motion.div variants={item}>
          <Card className="overflow-hidden border-none shadow-md bg-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Wallet className="h-5 w-5" />
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 bg-white/10 hover:bg-white/20 border-none rounded-lg" 
                  onClick={() => setIsWalletOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm font-medium opacity-80">Wallet Balance</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold">GHS {walletBalance.toFixed(2)}</h2>
                {walletBalance <= 0 && <AlertCircle className="h-4 w-4 text-yellow-300 animate-pulse" />}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-none shadow-md bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-xl text-white">
                  <span className="font-bold">₵</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-none">Today</Badge>
              </div>
              <p className="text-sm font-medium opacity-80">Today's Earnings</p>
              <h2 className="text-3xl font-bold">GHS {stats.todayEarnings.toFixed(2)}</h2>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground">Trips Completed</p>
              <h2 className="text-3xl font-bold">{stats.todayTrips}</h2>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground">Rating</p>
              <h2 className="text-3xl font-bold">{stats.rating}</h2>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Map Interface Integration */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Map View
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <LocateFixed className="h-4 w-4" />
                My Location
              </Button>
            </div>
          </div>
          
          <Card className="overflow-hidden border-none shadow-xl h-[400px] relative bg-muted/20">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-40 dark:opacity-20">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,20 L100,20 M0,50 L100,50 M0,80 L100,80 M20,0 L20,100 M50,0 L50,100 M80,0 L80,100" stroke="currentColor" strokeWidth="0.2" />
                <circle cx="50" cy="50" r="2" fill="var(--primary)" className="animate-pulse" />
                <path d="M20,20 L50,50 L80,20" stroke="var(--primary)" fill="none" strokeWidth="0.5" strokeDasharray="1,1" />
              </svg>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              {!isOnline ? (
                 <div className="bg-background/80 backdrop-blur-md p-8 rounded-3xl border shadow-2xl max-w-sm">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full inline-block mb-4">
                      <Clock className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold">Map is Offline</h3>
                    <p className="text-muted-foreground mt-2">
                      {walletBalance <= 0 
                        ? "Please load your wallet to go online and access the map." 
                        : "Go online to start seeing nearby rides and traffic on the map."}
                    </p>
                    <Button 
                      onClick={toggleOnline} 
                      className={cn(
                        "mt-6 px-8 py-6 rounded-2xl text-lg w-full",
                        walletBalance <= 0 ? "bg-muted text-muted-foreground" : ""
                      )}
                      disabled={walletBalance <= 0}
                    >
                      {walletBalance <= 0 ? "Wallet Empty" : "Go Online Now"}
                    </Button>
                 </div>
              ) : (
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-64">
                   <Card className="bg-background/95 backdrop-blur-md shadow-2xl border-primary/20">
                      <CardContent className="p-4 flex items-center gap-4">
                         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Navigation className="h-5 w-5 animate-pulse" />
                         </div>
                         <div className="flex-1 text-left">
                            <p className="text-xs font-bold uppercase">Live Tracking</p>
                            <p className="text-sm font-medium">Scanning for nearby rides...</p>
                         </div>
                      </CardContent>
                   </Card>
                </div>
              )}
            </div>
            
            {/* Map Overlay Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
               <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-background/90 h-10 w-10">
                  <Plus className="h-5 w-5" />
               </Button>
               <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-background/90 h-10 w-10">
                  <div className="w-4 h-0.5 bg-foreground" />
               </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle & Safety
          </h2>
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="relative h-32">
              <img 
                src={profile.vehicle.image} 
                alt={profile.vehicle.model}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold text-sm">{profile.vehicle.model}</h3>
                <p className="text-[10px] opacity-80">{profile.vehicle.plate}</p>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Engine: Healthy</span>
                </div>
                <span className="text-[10px] font-bold">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  <span>Tires: Normal</span>
                </div>
                <span className="text-[10px] font-bold">72%</span>
              </div>
              <Button variant="outline" className="w-full text-[10px] h-8" size="sm">
                Vehicle Report
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold">Insurance Active</p>
                <p className="text-[10px] opacity-80">Verified for GHS payouts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Load Wallet Dialog */}
      <Dialog open={isWalletOpen} onOpenChange={setIsWalletOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Load Wallet</DialogTitle>
            <DialogDescription>
              Add funds to your pre-paid wallet in GHS to continue receiving ride requests. 10% commission is deducted per trip.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount (GHS)</Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground flex items-center font-bold">₵</span>
                <Input 
                  id="amount" 
                  type="number" 
                  className="pl-10" 
                  placeholder="Enter amount (e.g. 50)" 
                  value={loadAmount}
                  onChange={(e) => setLoadAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 200].map(amt => (
                <Button 
                  key={amt} 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLoadAmount(amt.toString())}
                  className={loadAmount === amt.toString() ? "border-primary bg-primary/5" : ""}
                >
                  GHS {amt}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleLoad} className="w-full">Confirm Load</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;