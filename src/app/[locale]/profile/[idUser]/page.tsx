"use client";

import { useEffect, useState } from "react";
import {
  UserIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  PlusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Button from "@/app/components/ui/Button";
import { getOrganizationById } from "@/lib/features/organizations";

const plans = {
  basic: {
    name: "Básico",
    features: ["Hasta 4 usuarios", "Soporte básico", "Reportes limitados"],
  },
  pro: {
    name: "Pro",
    features: [
      "Hasta 15 usuarios",
      "Soporte prioritario",
      "Reportes avanzados",
    ],
  },
  enterprise: {
    name: "Enterprise",
    features: [
      "Usuarios ilimitados",
      "Soporte dedicado",
      "Integraciones personalizadas",
    ],
  },
};

export default function UserProfile() {
  const user = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("general");
  const [institutionName, setInstitutionName] = useState("Mi Institución");
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof plans>("basic");
  const organization = useAppSelector(state=>state.organizations)
  const {  token, logged, organization: { id: organizationId } = {}} = useAppSelector((state) => state.auth);
  console.log(organization.organizations[0]);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
      role: "Administrador",
    },
    { id: 2, name: "María Gómez", email: "maria@ejemplo.com", role: "Editor" },
  ]);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (logged && organizationId && token) {
      dispatch(getOrganizationById({ token, id: organizationId }));
    }
  }, [logged, token]);
  return (
    <div className="min-h-screen bg-neutral-100 flex px-16 py-4 mx-auto max-w-[1360px]">
      <aside className="w-64 bg-white text-neutral-800 p-6 space-y-4 border-r border-neutral-200 shadow-sm">
        <nav className="space-y-3">
          <SidebarItem
            label="General"
            icon={<BuildingOffice2Icon className="w-5 h-5" />}
            active={activeTab === "general"}
            onClick={() => setActiveTab("general")}
          />
          <SidebarItem
            label="Usuarios"
            icon={<UserIcon className="w-5 h-5" />}
            active={activeTab === "usuarios"}
            onClick={() => setActiveTab("usuarios")}
          />
          <SidebarItem
            label="Seguridad"
            icon={<ShieldCheckIcon className="w-5 h-5" />}
            active={activeTab === "seguridad"}
            onClick={() => setActiveTab("seguridad")}
          />
          <SidebarItem
            label="Configuraciones"
            icon={<Cog6ToothIcon className="w-5 h-5" />}
            active={activeTab === "configuraciones"}
            onClick={() => setActiveTab("configuraciones")}
          />
        </nav>
      </aside>

      <main className="flex-1 p-10 text-neutral-800">
        {activeTab === "general" && (
          <>
            <h1 className="text-2xl font-bold mb-6">General</h1>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-neutral-600">
                Nombre de la institución
              </label>
              <input
                type="text"
                value={organization.organizations[0]?.name || ""}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-neutral-600">
                Plan seleccionado
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value as any)}
                className="bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="basic">Básico</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                Características del plan "{plans[selectedPlan].name}"
              </h2>
              <ul className="list-disc list-inside text-neutral-700 space-y-1">
                {plans[selectedPlan].features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "usuarios" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Usuarios</h1>
              <button
                onClick={() =>
                  setEditingUser({
                    id: null,
                    name: "",
                    email: "",
                    role: "Lector",
                  })
                }
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-500 text-sm font-medium"
              >
                <PlusIcon className="w-5 h-5" />
                Agregar usuario
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow border border-neutral-200">
                <thead className="bg-neutral-100 text-neutral-700">
                  <tr>
                    <th className="text-left px-4 py-2">Nombre</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Rol</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {organization.organizations[0].users?.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-neutral-200 hover:bg-neutral-50"
                    >
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-emerald-600 hover:text-emerald-500"
                          aria-label="Editar"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingUser && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    {editingUser.id
                      ? "Editar usuario"
                      : "Agregar nuevo usuario"}
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                      placeholder="Nombre"
                      className="w-full bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                      placeholder="Email"
                      className="w-full bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <select
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                      className="w-full bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="admin">Administrador</option>
                      <option value="user">Usuario</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      onClick={() => setEditingUser(null)}
                      className="text-neutral-500 hover:text-neutral-800"
                    >
                      Cancelar
                    </button>
                    <Button
                      onClick={() => {
                        if (!editingUser.name || !editingUser.email) return;
                        if (editingUser.id) {
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.id === editingUser.id ? editingUser : u
                            )
                          );
                        } else {
                          setUsers((prev) => [
                            ...prev,
                            { ...editingUser, id: Date.now() },
                          ]);
                        }
                        setEditingUser(null);
                      }}
                    >
                      {editingUser.id ? "Guardar" : "Agregar"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "seguridad" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Seguridad</h1>
            <div className="max-w-md space-y-4">
              <input
                type="password"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white border border-neutral-300 text-neutral-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button>Cambiar contraseña</Button>
            </div>
          </>
        )}

        {activeTab === "configuraciones" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Configuraciones</h1>
            <p className="text-neutral-600">Contenido en desarrollo.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${
        active
          ? "bg-emerald-100 text-emerald-700 font-semibold"
          : "hover:bg-neutral-100 text-neutral-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
