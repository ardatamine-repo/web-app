"use client";

import { usePathname } from "next/navigation";
import NavigationBarContent from "./NavigationBarContent";
import { publicPaths } from "@/app/utils/publicRoutes";

// 🔧 Normaliza la ruta quitando los slashes finales
function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

export default function NavigationBar() {
  const pathname = usePathname();

  // Asegura que usePathname() haya devuelto un valor válido
  if (!pathname) return null;

  // Normaliza el pathname actual
  const currentPath = normalizePath(pathname);

  // Si el pathname está en la lista de rutas públicas, no renderizar el nav
  if (publicPaths.includes(currentPath)) {
    return null;
  }

  return <NavigationBarContent />;
}
