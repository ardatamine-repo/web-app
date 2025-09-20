"use client";

import { usePathname } from "next/navigation";
import NavigationBarContent from "./NavigationBarContent";
import { publicPaths } from "@/app/utils/publicRoutes";
import { useEffect, useState } from "react";

// Normaliza el path (sin slash final)
function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

export default function NavigationBar() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    const currentPath = normalizePath(pathname);
    const isPublic = publicPaths.includes(currentPath);

    console.log("🔍 Pathname en cliente:", pathname, "¿Es pública?", isPublic);

    if (!isPublic) {
      setShouldRender(true);
    }
  }, [pathname]);

  if (!shouldRender) return null;

  return <NavigationBarContent />;
}
