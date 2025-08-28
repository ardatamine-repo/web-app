// components/NavigationBarContent.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserAllInfo, loginSuccess, logout } from "@/lib/features/auth";
import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { validateToken } from "@/app/utils/auth/validate";
import { removeInfoProjects } from "@/lib/features/projects";

export default function NavigationBarContent() {
  const user = useAppSelector((state) => state.auth);
  const project = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
    dispatch(logout());
    dispatch(removeInfoProjects());
  };

  const getValidToken = (token: string) => {};

  const hasDispatchedRef = useRef(false);

  useEffect(() => {
    if (!hasDispatchedRef.current && project.projects.length === 0) {
      const valirToken = validateToken();
      if (valirToken) {
        dispatch(getUserAllInfo(valirToken.token));
        hasDispatchedRef.current = true; // ✅ evitar duplicado
      }
    }
  }, []);

  return (
    <nav className="relative z-10 h-16 flex items-center justify-between px-16 py-4 shadow">
      <div className="flex items-center space-x-3">
        <Link href="/" className=" cursor-pointer ">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-8 w-auto"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          href={`/profile/${user.id}`}
          className=" cursor-pointer flex items-center gap-2 text-sm text-neutral-800 hover:text-neutral-700 transition font-medium group"
          title="Profile"
        >
          <FaRegUser size={24} className="group-hover:animate-pulse" />
        </Link>
        <button
          onClick={handleLogout}
          className=" cursor-pointer flex items-center gap-2 text-sm text-neutral-800 hover:text-neutral-700 transition font-medium group"
          title="Cerrar sesión"
        >
          <FiLogOut size={24} className="group-hover:animate-pulse" />
        </button>
      </div>
    </nav>
  );
}
