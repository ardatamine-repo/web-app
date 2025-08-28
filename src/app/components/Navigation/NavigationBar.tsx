// components/NavigationBar.tsx
"use client";

import { usePathname } from "next/navigation";
import NavigationBarContent from "./NavigationBarContent";
import { publicPaths } from "@/app/utils/publicRoutes";

export default function NavigationBar() {
  const pathname = usePathname();
  

  if (publicPaths.includes(pathname)) {
    return null;
  }

  return <NavigationBarContent />;
}
