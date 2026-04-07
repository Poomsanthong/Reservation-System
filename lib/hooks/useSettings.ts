"use client";

import { useEffect, useState } from "react";
import { loadSettings, updateSettings } from "@/lib/server/settings";
import type {
  RestaurantSettings,
  UpdateRestaurantSettingsInput,
} from "@/features/settings/types";

export function useSettings() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await loadSettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const save = async (changes: Omit<UpdateRestaurantSettingsInput, "id">) => {
    if (!settings) {
      throw new Error("Settings are not loaded yet");
    }

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
