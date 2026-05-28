import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Clock, User, LogOut, Settings, CarTaxiFront } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Driver' },
    { to: '/passenger', icon: CarTaxiFront, label: 'Passenger' },
    { to: '/earnings', icon: BarChart3, label: 'Earnings' },
    { to: '/history', icon: Clock, label: 'History' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-2 flex justify-between items-center z-40 md:top-0 md:bottom-auto md:flex-col md:w-20 md:h-screen md:px-0 md:py-8 md:border-t-0 md:border-r">
      <div className="hidden md:flex flex-col items-center gap-8 mb-auto">
        <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-xl">
          D
        </div>
      </div>
      
      <div className="flex w-full justify-around md:flex-col md:gap-6 md:items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors relative",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-6 w-6" />
                <span className="text-[10px] font-medium md:hidden">{item.label}</span>
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full md:hidden" />
                )}
                {isActive && (
                  <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:flex flex-col items-center mt-auto">
        <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};