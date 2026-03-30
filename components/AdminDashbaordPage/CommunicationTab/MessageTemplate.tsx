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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTemplate } from "@/lib/api/functions";
import { getTemplates } from "@/lib/api/functions";
type Template = {
  id: string;
  type: string;
  subject: string;
  html: string;
};
const MessageTemplate = ({ restaurantId }: { restaurantId: string }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Template | null>(null);

  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");

  // fetch Templates from API
  useEffect(() => {
    setLoading(true);
    async function fetchTemplates() {
      try {
        const data = await getTemplates(restaurantId);
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const saveTemplate = async () => {
    try {
      if (!selected) return;
      setSaving(true);
      await updateTemplate(selected.id, { subject, html });
      setOpen(false);
      // update local state
      setTemplates((prev) =>
        prev.map((t) => (t.id === selected.id ? { ...t, subject, html } : t)),
      );
    } catch (error) {
      console.error("Failed to update or save template:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Message Templates</CardTitle>
        <CardDescription>
          Smart templates for automated communication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {templates.map((template, i) => (
          <div
            key={i}
            className="p-3 bg-primary-50 rounded-lg border cursor-pointer"
            onClick={() => {
              setSelected(template);
              setSubject(template.subject);
              setHtml(template.html);
              setOpen(true);
            }}
          >
            {" "}
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

        {/* Edit Template Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="space-y-3">
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
            </DialogHeader>
            <input
              className="border p-2 w-full"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="border p-2 w-full h-40"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
            />
            <Button onClick={saveTemplate} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>{" "}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MessageTemplate;
