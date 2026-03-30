"use client";

import { useParams } from "next/navigation";

export function useTenantSlug() {
  const params = useParams<{ slug?: string | string[] }>();
  console.log("useTenantSlug params:", params);
  return Array.isArray(params.slug) ? params.slug[0] : params.slug;
}
