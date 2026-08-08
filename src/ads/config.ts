export const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT?.trim() ?? '';
export const adsenseSlotLeft =
  import.meta.env.VITE_ADSENSE_SLOT_LEFT?.trim() ?? '';
export const adsenseSlotRight =
  import.meta.env.VITE_ADSENSE_SLOT_RIGHT?.trim() ?? '';

export const isAdsenseConfigured = Boolean(
  adsenseClient && adsenseSlotLeft && adsenseSlotRight,
);
