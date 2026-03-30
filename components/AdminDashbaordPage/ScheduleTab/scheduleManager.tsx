import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Users, Plus, Settings, AlertCircle } from "lucide-react";
import Setting from "./Setting";
import CalendarSetting from "./CalendarSetting";
import DailySchedule from "./DailySchedule";

export function ScheduleManager({ restaurant_id }: { restaurant_id: string }) {
  return (
    <div className="space-y-6">
      {/* Settings Card */}
      {/* //todo advanced settings like waitlist, max party size, etc */}
      {/* <Setting /> */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <CalendarSetting />
        {/* Daily Schedule */}
        <DailySchedule restaurant_id={restaurant_id} />
      </div>
      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Total Capacity</p>
                <p className="text-xl text-primary-900">112 guests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Avg Table Turn</p>
                <p className="text-xl text-primary-900">85 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Peak Hours</p>
                <p className="text-xl text-primary-900">6-8 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
