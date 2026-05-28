import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { RideRequestModal } from './RideRequestModal';
import { ActiveRideOverlay } from './ActiveRideOverlay';
import { Toaster } from 'sonner';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pl-20">
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <Navigation />
      <RideRequestModal />
      <ActiveRideOverlay />
      <Toaster position="top-center" expand={true} richColors />
    </div>
  );
};