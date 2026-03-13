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

import { useEffect, useState } from "react";
type Template = {
  id: string;
  type: string;
  subject: string;
  html: string;
};
const MessageTemplate = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  // fetch Templates from API
  useEffect(() => {
    async function fetchTemplates() {
      const res = await fetch("/api/templates");
      const data = await res.json();
      setTemplates(data || []);
      setLoading(false);
    }
    fetchTemplates();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Message Templates</CardTitle>
        <CardDescription>
          Smart templates for automated communication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {templates.map((template) => (
          <div className="p-3 bg-primary-50 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{template.type}</Badge>
              <span className="text-xs text-primary-500">Active</span>
            </div>
            <p className="text-sm text-primary-700">{template.subject}</p>
            <p className="text-xs text-primary-500 mt-1 line-clamp-2">
              {template.html.replace(/<[^>]+>/g, "")}
            </p>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => alert("Manage Templates clicked")}
        >
          Manage Templates
        </Button>
      </CardContent>
    </Card>
  );
};

export default MessageTemplate;
