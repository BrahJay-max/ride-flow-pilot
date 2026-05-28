import React from 'react';
import { useDriver } from '@/hooks/use-driver-state';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  DollarSign, 
  Calendar, 
  ChevronRight,
  TrendingUp,
  CreditCard,
  Download,
  Clock
} from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const Earnings: React.FC = () => {
  const { earningsHistory } = useDriver();

  const totalWeekly = earningsHistory.reduce((sum, day) => sum + day.amount, 0);

  const chartConfig = {
    amount: {
      label: "Earnings",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
          <p className="text-muted-foreground">Detailed breakdown in Ghana Cedis (GHS)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            This Week
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Overview</CardTitle>
              <CardDescription>Earnings from the last 7 days</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Total This Week</p>
              <h3 className="text-2xl font-bold text-primary">GHS {totalWeekly.toFixed(2)}</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(value) => `₵${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  >
                    {earningsHistory.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === earningsHistory.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.6)'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <CreditCard className="h-6 w-6" />
                </div>
                <Badge className="bg-white/20 text-white border-none">Available</Badge>
              </div>
              <p className="text-sm font-medium opacity-80">Available to Withdraw</p>
              <h2 className="text-3xl font-bold mb-6">GHS {(totalWeekly * 0.8).toFixed(2)}</h2>
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-bold">
                Cash Out Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Average/Trip
                </div>
                <span className="font-bold">GHS {(totalWeekly / 32).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Online Time
                </div>
                <span className="font-bold">42h 15m</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-bold">₵</span>
                  Bonuses
                </div>
                <span className="font-bold text-green-600">+GHS 45.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Payments</h2>
        <Card className="border-none shadow-md overflow-hidden">
          <div className="divide-y divide-border">
            {[
              { date: 'May 24, 2024', amount: 450.00, status: 'Processing' },
              { date: 'May 17, 2024', amount: 820.50, status: 'Paid' },
              { date: 'May 10, 2024', amount: 690.20, status: 'Paid' },
            ].map((payment, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <span className="font-bold text-lg">₵</span>
                  </div>
                  <div>
                    <p className="font-semibold">{payment.date}</p>
                    <p className="text-xs text-muted-foreground">Mobile Money Deposit to **** 4242</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="font-bold">GHS {payment.amount.toFixed(2)}</p>
                    <Badge variant={payment.status === 'Paid' ? 'outline' : 'secondary'} className={payment.status === 'Paid' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                      {payment.status}
                    </Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Earnings;