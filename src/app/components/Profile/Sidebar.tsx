"use client";
import { useState } from "react";
import {
  UserIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/ui/Button";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [institutionName, setInstitutionName] = useState("Mi Institución");
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com" },
    { id: 2, name: "María Gómez", email: "maria@ejemplo.com" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "" });
  };

  const handleUserChange = (index: number, field: string, value: string) => {
    const updated = [...users];
    updated[index] = { ...updated[index], [field]: value };
    setUsers(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white p-6 space-y-4 border-r border-slate-700">
        <h2 className="text-xl font-bold text-emerald-400 mb-4">Panel</h2>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("usuarios")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${
              activeTab === "usuarios"
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            <UserIcon className="w-5 h-5" />
            Administrador de usuarios
          </button>
          <button
            onClick={() => setActiveTab("institucion")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${
              activeTab === "institucion"
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            <BuildingOffice2Icon className="w-5 h-5" />
            Información de la institución
          </button>
          <button
            onClick={() => setActiveTab("seguridad")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${
              activeTab === "seguridad"
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            <ShieldCheckIcon className="w-5 h-5" />
            Seguridad
          </button>
          <button
            onClick={() => setActiveTab("configuraciones")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md ${
              activeTab === "configuraciones"
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            Configuraciones
          </button>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-10 text-slate-300">
        {activeTab === "usuarios" && (
          <>
            <h1 className="text-2xl font-bold text-white mb-4">
              Administrador de usuarios
            </h1>
            <div className="space-y-4 mb-6">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-slate-800 p-4 rounded-md flex items-center gap-4"
                >
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      handleUserChange(index, "name", e.target.value)
                    }
                    placeholder="Nombre"
                    className="bg-slate-700 text-white rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      handleUserChange(index, "email", e.target.value)
                    }
                    placeholder="Email"
                    className="bg-slate-700 text-white rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="ml-auto text-red-400 hover:text-red-600"
                    aria-label="Eliminar usuario"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-6 flex gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="bg-slate-700 text-white rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="bg-slate-700 text-white rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleAddUser}
                className="text-emerald-400 hover:text-emerald-600"
                aria-label="Agregar usuario"
              >
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>

            <Button>Guardar cambios</Button>
          </>
        )}

        {activeTab === "institucion" && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Información de la institución
            </h1>
            <input
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="bg-slate-700 text-white rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="mt-2 text-slate-400 text-sm">
              Este nombre será visible para todos los usuarios.
            </p>
          </div>
        )}

        {activeTab === "seguridad" && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">Seguridad</h1>
            <p className="text-slate-400">
              Aquí podrías configurar contraseñas, autenticación de dos pasos,
              etc. (contenido pendiente).
            </p>
          </div>
        )}

        {activeTab === "configuraciones" && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Configuraciones
            </h1>
            <p className="text-slate-400">
              Aquí podrías agregar preferencias generales o notificaciones.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
