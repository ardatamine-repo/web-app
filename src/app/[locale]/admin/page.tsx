"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import CreateOrganizationForm from "./organizations/[idOrganization]/components/CreateOrganizations";
import { getOrganizationsAdmin } from "@/lib/features/admin";
// Asegurate de crear este modal

export default function OrganizationsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { username, organization, token, logged } = useAppSelector(
    (state) => state.auth
  );
  const { organizations, loading } = useAppSelector(
    (state) => state.admin
  );

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(logged, token, organizations.length);
    if (logged && token && organizations.length === 0) {
      console.log("se ejecuta esta accion");
      dispatch(getOrganizationsAdmin(token));
      
    }
  }, [logged]);
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-slate-300 relative">
      
      {showCreateForm && (
        <CreateOrganizationForm
          onClose={() => {
            setShowCreateForm(false);
          }}
        />
      )}
      {loading || !logged ? (
        <Loading />
      ) : (
        <main className="relative z-10 px-6 py-12">
          <h1 className="text-4xl font-bold text-white text-center mb-20">
            Organizaciones de ArDataMine
          </h1>

          {/* Buscador y botón */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <input
              type="text"
              placeholder="Buscar organización..."
              className="w-full md:w-1/2 px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
            >
              Crear Organización
            </button>
          </div>

          {/* Cards de organizaciones */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.map((org) => (
                <Link
                  href={`/admin/organizations/${org.id}`}
                  key={org.id}
                  className="bg-slate-800 rounded-xl p-6 shadow-md border border-slate-700 hover:border-emerald-500 transition flex gap-4 items-center group"
                >
                  <div className="border p-4 rounded-full border-slate-500 overflow-hidden">
                    <Image
                      src={"/logo-simplify.png"}
                      width={40}
                      height={40}
                      alt=""
                      className="group-hover:scale-125 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {org.name}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
