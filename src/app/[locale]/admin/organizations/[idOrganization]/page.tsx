"use client";

import Loading from "@/app/components/Loading";
import { getOrganizationById } from "@/lib/features/organizations";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import CreateOrganizationForm from "./components/CreateOrganizations";
import { useRouter } from "next/navigation";
import { fetchRoles } from "@/lib/features/roles";
import CrearUsuarioForm from "./components/CreateUsers";
import TestCreateProject from "./components/CreateProjectButtonTest";
import UpdateOrganizationModalForm from "./components/UpdateOrganizations";
import { deleteOrganization } from "../../../../../lib/features/organizations";
import DeleteOrganization from "./components/DeleteOrganization";
import { FaEdit, FaTrash } from "react-icons/fa";

interface PageProps {
  params: Promise<{
    idOrganization: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { idOrganization } = use(params);
  const { token, logged, id } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const organization = useAppSelector((state) =>
    state.organizations.organizations.find((org) => org.id === idOrganization)
  );
  const loading = useAppSelector(
    (state) => state.organizations.loadingIndividual
  );

  const getIniciales = (nombre: string) => {
    const partes = nombre.split(" ");
    const iniciales = partes
      .map((p) => p[0])
      .slice(0, 2)
      .join("");
    return iniciales.toUpperCase();
  };
  const dispatch = useAppDispatch();

  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  const [showUpdateOrganization, setShowUpdateOrganization] = useState(false);
  const [
    showDeleteOrganizationModal,
    setShowDeleteOrganizationModal,
  ] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  useEffect(() => {
    if (idOrganization && token && !organization?.prefix) {
      console.log("test");

      dispatch(getOrganizationById({ token, id: idOrganization }));
      dispatch(fetchRoles(token));
    }
  }, [token, idOrganization]);
  if (!organization || !token) {
    console.log("dale");
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-slate-300 px-6 py-12">
      {showCreateUserForm && (
        <CrearUsuarioForm
          onClose={() => {
            setShowCreateUserForm(false);
          }}
          organization={organization}
        />
      )}
      {showUpdateOrganization && (
        <UpdateOrganizationModalForm
          organizationId={organization.id}
          onClose={() => {
            setShowUpdateOrganization(false);
          }}
          initialData={organization}
        />
      )}
      {showDeleteOrganizationModal && (
        <DeleteOrganization
          token={token}
          organizationId={organization.id}
          onClose={() => {
            setShowDeleteOrganizationModal(false);
          }}
        />
      )}
      <button
        className="text-white bg-red-500 hover:bg-red-600 rounded-2xl p-2"
        onClick={() => {
          setShowDeleteOrganizationModal(true);
        }}
      >
        Delete organization
      </button>

      <button
        className="text-white bg-yellow-500 hover:bg-yellow-600 rounded-2xl p-2"
        onClick={() => {
          // console.log(organization.id)
          // updateOrganization();
          setShowUpdateOrganization(true);
        }}
      >
        update organization
      </button>
      <button
        className="p-2 rounded-2xl bg-green-500"
        onClick={() => {
          setShowCreateUserForm(true);
        }}
      >
        Agergar usuario
      </button>

      <div className="max-w-6xl mx-auto">
        {/* Header con flecha y nombre */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/admin"
            className="text-emerald-400 hover:text-white transition flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>

        {/* Cuerpo: usuarios y proyectos */}
        {loading || !logged ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Integrantes */}
            <h1 className="text-2xl font-bold text-white text-right">
              {organization?.name}
              {organization?.prefix}
              {organization?.website}
            </h1>
            <div>
              <ul className="space-y-4">
                {organization?.users?.map((user: any) => (
                  <li key={user.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      {getIniciales(user.username)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <FaEdit
                        onClick={() => {
                          setShowUpdateUser(true);
                        }}
                      />
                      <FaTrash
                        onClick={() => {
                          setShowDeleteUser(true);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proyectos */}
            <div>
              <ul className="space-y-3">
                {organization?.projects?.map((proyecto: any) => (
                  <li key={proyecto.id}>
                    <Link
                      href={`/admin/projects/${proyecto.id}`}
                      className="flex items-center bg-slate-800 rounded-md px-4 py-3 border border-slate-700 hover:border-emerald-500 transition shadow-sm cursor-pointer hover:scale-[1.03] transform-gpu gap-3"
                    >
                      <Image
                        src="/logo-simplify.png"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded"
                        priority={true}
                      />
                      <p className="flex-grow text-white font-medium">
                        {proyecto.name}
                      </p>
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
