import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useDriver } from '@/hooks/use-driver-state';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bell, 
  Moon, 
  Sun, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Music,
  Smartphone,
  Check,
  MessageSquare,
  Send,
  MapPin,
  Map as MapIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { navigationApp, setNavigationApp } = useDriver();
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('soundEnabled') !== 'false';
  });
  const [selectedSound, setSelectedSound] = useState(() => {
    return localStorage.getItem('notificationSound') || 'bell';
  });
  const [volume, setVolume] = useState(() => {
    return parseInt(localStorage.getItem('notificationVolume') || '80');
  });

  const sounds: Record<string, string> = {
    bell: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
    ding: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    chime: 'https://assets.mixkit.co/active_storage/sfx/2566/2566-preview.mp3',
  };

  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled.toString());
    localStorage.setItem('notificationSound', selectedSound);
    localStorage.setItem('notificationVolume', volume.toString());
  }, [soundEnabled, selectedSound, volume]);

  const playTestSound = () => {
    if (!soundEnabled) return;
    const audio = new Audio(sounds[selectedSound]);
    audio.volume = volume / 100;
    audio.play();
    toast.info(`Playing ${selectedSound} at ${volume}% volume`);
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences and navigation tools</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Navigation Section */}
        <motion.div variants={item}>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-5 w-5 text-primary" />
                Navigation System
              </CardTitle>
              <CardDescription>Select your preferred app for live driving directions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Navigation App</Label>
                <Select value={navigationApp} onValueChange={setNavigationApp}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Choose app" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google Maps">Google Maps</SelectItem>
                    <SelectItem value="Waze">Waze</SelectItem>
                    <SelectItem value="Apple Maps">Apple Maps</SelectItem>
                    <SelectItem value="Bolt Navigation">In-App Navigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium">New rides will automatically open in {navigationApp}.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance Section */}
        <motion.div variants={item}>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of your app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Theme Mode</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'system', label: 'System', icon: Monitor },
                  ].map((t) => (
                    <Button
                      key={t.value}
                      variant={theme === t.value ? 'default' : 'outline'}
                      className="flex flex-col h-20 gap-2 relative"
                      onClick={() => setTheme(t.value)}
                    >
                      <t.icon className="h-5 w-5" />
                      <span className="text-xs">{t.label}</span>
                      {theme === t.value && <Check className="h-3 w-3 absolute top-1 right-1" />}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div variants={item}>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Sounds
              </CardTitle>
              <CardDescription>Manage how you get notified of new rides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Sounds</Label>
                  <p className="text-xs text-muted-foreground">Play sounds for incoming requests</p>
                </div>
                <Switch 
                  checked={soundEnabled} 
                  onCheckedChange={setSoundEnabled} 
                />
              </div>

              <div className="space-y-4">
                <div className={!soundEnabled ? 'opacity-50 pointer-events-none' : ''}>
                  <Label className="mb-2 block">Notification Sound</Label>
                  <div className="flex gap-4">
                    <Select value={selectedSound} onValueChange={setSelectedSound}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sound" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bell">Standard Bell</SelectItem>
                        <SelectItem value="ding">Digital Ding</SelectItem>
                        <SelectItem value="chime">Soft Chime</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="icon" variant="outline" onClick={playTestSound}>
                      <Music className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className={!soundEnabled ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Volume</Label>
                    <span className="text-xs text-muted-foreground">{volume}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {volume === 0 ? <VolumeX className="h-4 w-4 text-muted-foreground" /> : <Volume2 className="h-4 w-4 text-muted-foreground" />}
                    <Slider 
                      value={[volume]} 
                      onValueChange={(vals) => setVolume(vals[0])} 
                      max={100} 
                      step={1} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Message Center Section */}
        <motion.div variants={item}>
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Message Center
              </CardTitle>
              <CardDescription>Send a message to our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-3">
                <Label htmlFor="support-msg">How can we help?</Label>
                <textarea 
                  id="support-msg" 
                  className="w-full bg-background border border-input rounded-md p-3 text-sm min-h-[100px] focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Type your message here..."
                />
                <Button className="w-full gap-2" onClick={() => toast.success("Message sent! We will get back to you soon.")}>
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Settings;