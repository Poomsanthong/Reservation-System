"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import { useState } from "react";

const Setting = () => {
  const [autoAccept, setAutoAccept] = useState(true);
  const [waitlistEnabled, setWaitlistEnabled] = useState(true);
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>
                Configure availability and booking rules
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Accept Bookings</Label>
                  <p className="text-sm text-slate-600">
                    Automatically confirm reservations
                  </p>
                </div>
                <Switch
                  checked={autoAccept}
                  onCheckedChange={setAutoAccept}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Waitlist</Label>
                  <p className="text-sm text-slate-600">
                    Allow guests to join waitlist
                  </p>
                </div>
                <Switch
                  checked={waitlistEnabled}
                  onCheckedChange={setWaitlistEnabled}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label>Default Table Capacity</Label>
                <Select defaultValue="8">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Tables</SelectItem>
                    <SelectItem value="6">6 Tables</SelectItem>
                    <SelectItem value="8">8 Tables</SelectItem>
                    <SelectItem value="10">10 Tables</SelectItem>
                    <SelectItem value="12">12 Tables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timing Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Booking Window</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days ahead</SelectItem>
                    <SelectItem value="14">14 days ahead</SelectItem>
                    <SelectItem value="30">30 days ahead</SelectItem>
                    <SelectItem value="60">60 days ahead</SelectItem>
                    <SelectItem value="90">90 days ahead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Minimum Notice</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Average Table Duration</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="75">75 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
