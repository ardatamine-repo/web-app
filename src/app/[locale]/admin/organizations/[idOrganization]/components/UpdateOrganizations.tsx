"use client";

import { useState, useEffect } from "react";
import {
  XMarkIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  IdentificationIcon,
  UserCircleIcon,
  LockClosedIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateOrganization } from "@/lib/features/organizations";

interface Props {
  organizationId: string;
  initialData: Partial<NewOrganizationForm>; // Podés ajustar si querés
  onClose: () => void;
}

// Tipo del formulario (igual que antes)
type NewOrganizationForm = {
  name: string;
  email: string;
  prefix: string;
  phone: string;
  cuit: string;
  country: string;
  industry: string;
  website: string;
  leader_uuid: string;
  leader_info: string;
  db_url_encrypted: string;
};

export default function UpdateOrganizationModalForm({
  organizationId,
  initialData,
  onClose,
}: Props) {
  const { token, id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Estado inicial mezclando props con defaults
  const initialState: NewOrganizationForm = {
    name: initialData.name || "",
    email: initialData.email || "",
    prefix: initialData.prefix || "",
    phone: initialData.phone || "",
    cuit: initialData.cuit || "",
    country: initialData.country || "",
    industry: initialData.industry || "",
    website: initialData.website || "",
    leader_uuid: id || "",
    leader_info: initialData.leader_info || "",
    db_url_encrypted: initialData.db_url_encrypted || "",
  };

  const [form, setForm] = useState<NewOrganizationForm>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields = [
    { name: "name", label: "Nombre", icon: BuildingOfficeIcon },
    { name: "email", label: "Correo", icon: EnvelopeIcon },
    { name: "prefix", label: "Prefijo", icon: HashtagIcon },
    { name: "phone", label: "Teléfono", icon: PhoneIcon },
    { name: "cuit", label: "CUIT", icon: IdentificationIcon },
    { name: "country", label: "País", icon: GlobeAltIcon },
    { name: "industry", label: "Industria", icon: GlobeAltIcon },
    { name: "website", label: "Sitio Web", icon: GlobeAltIcon },
    { name: "leader_uuid", label: "UUID del Líder", icon: UserCircleIcon },
    { name: "leader_info", label: "Info del Líder", icon: UserCircleIcon },
    { name: "db_url_encrypted", label: "DB Encriptada", icon: LockClosedIcon },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!token || !id) {
      setError("Error de autenticación. Vuelve a iniciar sesión.");
      return;
    }

    setLoading(true);

    try {
      const resultAction = await dispatch(
        updateOrganization({
          token,
          organizationId,
          organizationData: { ...form, leader_uuid: id },
        })
      );

      if (updateOrganization.fulfilled.match(resultAction)) {
        setSuccess(true);
      } else {
        const error =
          (resultAction.payload as string) ||
          resultAction.error.message ||
          "Error desconocido";
        setError(error);
      }
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto mt-10 mb-16 bg-slate-900 border border-slate-700 rounded-xl shadow-xl relative p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">
          Actualizar Organización
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {fields.map(({ name, label, icon: Icon }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm mb-1 text-slate-300"
              >
                {label}
              </label>
              <div className="relative">
                <Icon className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                <input
                  id={name}
                  name={name}
                  type="text"
                  value={(form as any)[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          ))}

          <div className="col-span-full flex flex-col items-center mt-6 space-y-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-400 text-sm">
                Organización actualizada correctamente
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-md text-white font-medium disabled:opacity-60"
            >
              {loading ? "Actualizando..." : "Actualizar Organización"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
