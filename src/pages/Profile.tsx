import React from 'react';
import { useDriver } from '@/hooks/use-driver-state';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Car, 
  CreditCard, 
  Bell, 
  Shield, 
  ChevronRight,
  LogOut,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { profile, updateProfile } = useDriver();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account and vehicle details</p>
        </div>
        <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-white border-destructive/20 gap-2">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Avatar and Basic Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary" />
            <CardContent className="p-6 pt-0 -mt-12 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {profile.name[0]}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg border-2 border-background">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Silver Partner Driver</p>
              <div className="flex justify-center gap-2">
                <div className="px-3 py-1 bg-muted rounded-full text-xs font-semibold">4.9 ★</div>
                <div className="px-3 py-1 bg-muted rounded-full text-xs font-semibold">1.2k Trips</div>
              </div>
            </CardContent>
            <div className="border-t border-border flex divide-x divide-border">
              <button className="flex-1 p-3 text-xs font-bold hover:bg-muted/50 transition-colors">Edit Photo</button>
              <button className="flex-1 p-3 text-xs font-bold hover:bg-muted/50 transition-colors">Public Profile</button>
            </div>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-4 border-b border-border flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Security</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Payout Methods</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle/Right: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profile.name} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 000-0000" className="h-12" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="alex.johnson@example.com" className="h-12" />
                </div>
              </div>
              <Button className="mt-2 h-12 px-8">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>Information about your registered vehicle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="relative group overflow-hidden rounded-xl border border-border aspect-video md:aspect-square">
                    <img 
                      src={profile.vehicle.image} 
                      alt="Vehicle" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="gap-2">
                        <Camera className="h-4 w-4" />
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vehicle Model</Label>
                      <Input defaultValue={profile.vehicle.model} className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label>License Plate</Label>
                      <Input defaultValue={profile.vehicle.plate} className="h-11 uppercase" />
                    </div>
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <Input defaultValue={profile.vehicle.color} className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Type</Label>
                      <div className="h-11 flex items-center px-3 bg-muted rounded-md text-sm font-medium">
                        Electric Sedan (Elite)
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <p className="text-xs font-medium">This vehicle is verified and approved for ride-share service.</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full h-12">Update Vehicle Registration</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;