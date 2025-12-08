"use client";

import { useEffect, useState } from "react";
import { loadSettings, updateSettings } from "@/lib/server/settings";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await loadSettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const save = async (changes: any) => {
    const updated = await updateSettings({
      id: settings.id,
      ...changes,
    });
    setSettings(updated);
  };

  return {
    settings,
    loading,
    save,
  };
}
