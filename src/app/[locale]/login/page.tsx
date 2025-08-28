"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser1FA } from "@/lib/features/auth";
import TwoFactorVerification from "./2FAValidation";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const { token, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [open2FA, setOpen2FA] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit1FA = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(loginUser1FA({ email, password }))
      .unwrap()
      .then(() => {
        setOpen2FA(true);
      });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(email,password)
  //   try {
  //     const res = await fetch(
  //       "https://mvp-api-test-771209590309.us-east1.run.app/auth/login_step1",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email, password }),
  //       }
  //     );

  //     if (!res.ok) {
  //       // Puedes intentar extraer un mensaje de error del body si la API lo provee
  //       const errorData = await res.json().catch(() => null);
  //       const errorMessage = errorData?.message || "Error en login";
  //       throw new Error(errorMessage);
  //     }

  //     const result = await res.json();
  //     console.log("Respuesta:", result);
  //     return result;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Opcional: manejar error en UI o retornar un valor específico
  //   }
  // };

  // useEffect(() => {
  //   if (user.logged) {
  //     router.push("/");
  //   }
  // }, [user.logged]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 relative">
      {open2FA && (
        <TwoFactorVerification email={email}
        />
      )}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl p-8 text-gray-900 shadow-xl border border-gray-300">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="AR Data Mine"
            className="h-12 w-auto"
            width={200}
            height={200}
          />
        </div>

        <form onSubmit={handleSubmit1FA} className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 text-xl mb-1">
              Iniciar Sesión
            </h3>
            <p className="text-gray-600 text-sm">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico o nombre de usuario
            </label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ardatamine.com"
                required
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full pl-10 pr-10 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-emerald-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Recordarme</span>
            </label>
            <Link href="/register" className="text-emerald-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center font-medium">
              {error.toString()}
            </div>
          )}

          <Button disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-emerald-600 hover:underline">
            Solicitar acceso
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-gray-400 select-none">
          © 2025 ARDATAMINE.
        </p>
      </div>
    </div>
  );
}
