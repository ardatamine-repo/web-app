"use client";

import { usePathname } from "next/navigation";
import NavigationBarContent from "./NavigationBarContent";
import { publicPaths } from "@/app/utils/publicRoutes";

export default function NavigationBar() {
  const pathname = usePathname();

  // Esperar a que pathname esté definido (esto previene render incorrecto en SSR)
  if (!pathname) return null;
  console.log(pathname,publicPaths,publicPaths.includes(pathname))
  if (publicPaths.includes(pathname)) {
    return null;
  }

  return <NavigationBarContent />;
}
