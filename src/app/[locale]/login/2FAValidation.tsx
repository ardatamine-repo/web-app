"use client";

import { useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import Button from "@/app/components/ui/Button";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser2FA } from "@/lib/features/auth";
import { useRouter } from "@/i18n/navigation";

interface Props {
  email: string;
}

export default function TwoFactorVerification({ email }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      dispatch(loginUser2FA({ email, code }))
        .unwrap()
        .then(() => {
          router.push("/");
        });
    } catch (err) {
      console.log(err);
    }
  };
  const resendCode = () => {
    try {
      dispatch(loginUser2FA({ email, code }))
        .unwrap()
        .then(() => {
          router.push("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md shadow-2xl text-gray-800 relative">
        <div className="flex justify-center mb-4">
          <ShieldCheckIcon className="w-10 h-10 text-emerald-500 animate-pulse" />
        </div>

        <h2 className="text-gray-900 text-xl font-semibold text-center mb-2">
          Verificá tu identidad
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Ingresá el código de seguridad que te enviamos para continuar
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="xxxxxx"
            maxLength={6}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 text-center placeholder:text-neutral-600 focus:placeholder:text-neutral-900 text-gray-800 tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-lg border border-neutral-300 "
          />

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verificando..." : "Verificar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          ¿No recibiste el código?{" "}
          <button
            onClick={() => {
              alert("Código reenviado");
              resendCode();
            }}
            className="text-emerald-500 hover:underline"
          >
            Reenviar
          </button>
        </p>
      </div>
    </div>
  );
}
