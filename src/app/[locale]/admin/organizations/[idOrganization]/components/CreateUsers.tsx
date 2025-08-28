"use client";

import {
  EnvelopeIcon,
  UserCircleIcon,
  PhoneIcon,
  LockClosedIcon,
  HashtagIcon,
  BuildingOffice2Icon,
  KeyIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createUser,
  Organization,
} from "@/lib/features/organizations";

interface Props {
  onClose: () => void;
  organization: Organization;
}

type NewUserForm = {
  username: string;
  email: string;
  full_name: string;
  phone: string;
  type: string;
  password: string;
  confirm_password: string;
  is_active: boolean; // siempre true, no se edita
  organization_id: string;
  role_id: string;
};

const initialState: NewUserForm = {
  username: "userTest",
  email: "villalon51397@estudiantes.untref.edu.ar",
  full_name: "testuser test",
  phone: "123123123",
  type: "test",
  password: "hola1234",
  confirm_password: "hola1234",
  is_active: true,
  organization_id: "",
  role_id: "",
};

export default function CrearUsuarioModal({ onClose, organization }: Props) {
  const roles = useAppSelector((state) => state.roles.roles);
  const { token } = useAppSelector((state) => state.auth);
  const rolestest = ["admin", "user"];
  const [form, setForm] = useState<NewUserForm>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const fields = [
    { name: "username", label: "Usuario", icon: UserCircleIcon },
    { name: "email", label: "Correo", icon: EnvelopeIcon },
    { name: "full_name", label: "Nombre completo", icon: UserCircleIcon },
    { name: "phone", label: "Teléfono", icon: PhoneIcon },
    { name: "type", label: "Tipo", icon: HashtagIcon },
    {
      name: "password",
      label: "Contraseña",
      icon: LockClosedIcon,
      type: "password",
    },
    {
      name: "confirm_password",
      label: "Confirmar Contraseña",
      icon: LockClosedIcon,
      type: "password",
    },
    {
      name: "organization_id",
      label: "Organización",
      icon: BuildingOffice2Icon,
      value: organization.id,
    },
  ];

  useEffect(() => {
    if (form.confirm_password && form.password !== form.confirm_password) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError(null);
    }
  }, [form.password, form.confirm_password]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      // Aquí iría el envío real a backend
      // await new Promise((res) => setTimeout(res, 1000));
      console.log("Usuario creado:", form);
      if (token) {
        const { confirm_password, ...userData } = form;
        dispatch(createUser({ token, userData }));
      }

      setSuccess(true);
      // setForm(initialState);
    } catch {
      setError("Error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto mt-10 mb-16 bg-slate-900 border border-slate-700 rounded-xl shadow-xl relative p-8">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">
          Crear Usuario
        </h2>
        
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          autoComplete="off"
        >
          {fields.map(({ name, label, icon: Icon, type, value }) => (
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
                  type={type || "text"}
                  value={value !== undefined ? value : (form as any)[name]}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder={organization.name}
                  disabled={value !== undefined}
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          ))}

          {/* Select roles */}
          <div>
            <label
              htmlFor="role_id"
              className="block text-sm mb-1 text-slate-300"
            >
              Rol
            </label>
            <select
              id="role_id"
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              className="w-full pl-3 pr-3 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Selecciona un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mensajes */}
          {passwordError && (
            <p className="col-span-full text-red-500 text-sm">
              {passwordError}
            </p>
          )}

          <div className="col-span-full flex flex-col items-center mt-6 space-y-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-400 text-sm">
                Usuario creado correctamente
              </p>
            )}
            <button
              type="submit"
              disabled={loading || Boolean(passwordError)}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-md text-white font-medium disabled:opacity-60"
            >
              {loading ? "Creando..." : "Crear Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
