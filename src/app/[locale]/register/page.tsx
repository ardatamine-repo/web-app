"use client";
import { useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaPlus } from "react-icons/fa";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$20/mes",
    maxUsers: 5,
    features: [
      "1 Cuenta administrativa",
      "Hasta 4 usuarios",
      "Soporte básico",
      "Acceso limitado a reportes",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$50/mes",
    maxUsers:9,
    features: [
      "1 Cuenta administrativa",
      "Hasta 8 usuarios",
      "Soporte prioritario",
      "Reportes avanzados",
      "Exportación de datos",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    maxUsers: Infinity,
    features: [
      "1 Cuenta administrativa",
      "Usuarios ilimitados",
      "Soporte dedicado",
      "Integraciones personalizadas",
      "Onboarding guiado",
    ],
  },
];

type User = {
  name: string;
  email: string;
};

export default function Register() {
  const [institution, setInstitution] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [users, setUsers] = useState<User[]>([]);

  const maxUsers = selectedPlan.maxUsers;

  const handleAddUser = () => {
    if (users.length + 1 >= maxUsers && selectedPlan.id !== "enterprise") {
      alert(
        `El plan ${selectedPlan.name} permite hasta ${
          maxUsers - 1
        } usuarios adicionales.`
      );
      return;
    }
    setUsers([...users, { name: "", email: "" }]);
  };

  const handleUserChange = (
    index: number,
    field: keyof User,
    value: string
  ) => {
    const updated = [...users];
    updated[index] = { ...updated[index], [field]: value };
    setUsers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { institution, plan: selectedPlan.id, admin, users };
    console.log("Datos del registro:", payload);
    // enviar a tu API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-slate-900/80 border border-emerald-700 p-10 rounded-2xl shadow-xl space-y-8 backdrop-blur-md"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Registro de Institución</h1>
          <p className="text-sm text-slate-300">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-emerald-400 font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Institución */}
        <div>
          <label className="block mb-1 font-semibold text-white">
            Nombre de la Institución
          </label>
          <input
            className="w-full bg-slate-800 border border-emerald-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej: Universidad del Sur"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
        </div>

        {/* Planes */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Elige un Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-xl transition-colors cursor-pointer border-2 ${
                  selectedPlan.id === plan.id
                    ? "border-emerald-500 bg-emerald-950/40"
                    : "border-slate-700 bg-slate-800/60"
                } hover:border-emerald-400`}
                onClick={() => {
                  setSelectedPlan(plan);
                  setUsers([]);
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <span className="text-sm">{plan.price}</span>
                </div>
                <ul className="text-sm space-y-1 text-slate-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-400 w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Administrador */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Cuenta Administradora</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-slate-800 border border-emerald-700 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Nombre del Administrador"
              value={admin.name}
              onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
              required
            />
            <input
              className="bg-slate-800 border border-emerald-700 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Email del Administrador"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Usuarios adicionales */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Usuarios Adicionales</h2>
          {users.map((user, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <input
                className="bg-slate-800 border border-emerald-700 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={`Nombre del Usuario ${index + 1}`}
                value={user.name}
                onChange={(e) =>
                  handleUserChange(index, "name", e.target.value)
                }
                required
              />
              <input
                className="bg-slate-800 border border-emerald-700 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={`Email del Usuario ${index + 1}`}
                value={user.email}
                onChange={(e) =>
                  handleUserChange(index, "email", e.target.value)
                }
                required
              />
            </div>
          ))}

          {(users.length + 1 <= maxUsers ||
            selectedPlan.id === "enterprise") && (
            <button
              type="button"
              onClick={handleAddUser}
              className="mt-2 flex items-center gap-2 text-sm text-emerald-400 hover:underline"
            >
              <FaPlus size={14} />
              Agregar otro usuario
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md transition-all"
        >
          Finalizar Registro
        </button>
      </form>
    </div>
  );
}
