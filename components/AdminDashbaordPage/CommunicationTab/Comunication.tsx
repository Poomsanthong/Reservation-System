"use client";
import React from "react";
import { Badge } from "../../ui/badge";
import { Mail, MessageSquare, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const Comunication = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Communication Stats</CardTitle>
        <CardDescription>Automated messaging performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Confirmations Sent</p>
              <p className="text-xl text-slate-900">1,847</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">98.5% delivered</Badge>
        </div>
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Reminders Sent</p>
              <p className="text-xl text-slate-900">2,143</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">97.2% opened</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Recommendations</p>
              <p className="text-xl text-slate-900">892</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">42% conversion</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Comunication;
