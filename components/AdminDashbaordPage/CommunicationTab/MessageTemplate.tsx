"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MessageTemplate = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Message Templates</CardTitle>
        <CardDescription>
          Smart templates for automated communication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-primary-50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">Confirmation</Badge>
            <span className="text-xs text-primary-500">Active</span>
          </div>
          <p className="text-sm text-primary-700">
            "Hi [Name]! Your table for [Party Size] at [Restaurant] is confirmed
            for [Date] at [Time]. See you soon! 🎉"
          </p>
        </div>
        <div className="p-3 bg-primary-50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">Reminder</Badge>
            <span className="text-xs text-primary-500">Active</span>
          </div>
          <p className="text-sm text-primary-700">
            "Reminder: Your reservation at [Restaurant] is tomorrow at [Time].
            We can't wait to see you! ✨"
          </p>
        </div>
        <div className="p-3 bg-primary-50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">Waitlist Update</Badge>
            <span className="text-xs text-primary-500">Active</span>
          </div>
          <p className="text-sm text-primary-700">
            "Great news [Name]! A table just opened up for [Date] at [Time].
            Reply YES to claim it! ⏰"
          </p>
        </div>
        <Button variant="outline" className="w-full">
          Manage Templates
        </Button>
      </CardContent>
    </Card>
  );
};

export default MessageTemplate;
