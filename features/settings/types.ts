export type RestaurantSettings = {
  id: string;
} & Record<string, string | number | boolean | null>;

export type UpdateRestaurantSettingsInput = Partial<RestaurantSettings> & {
  id: string;
};

