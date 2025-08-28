"use client";
import Link from "next/link";
import CrearProyectoModal from "../components/CreateProyectModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  LockClosedIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  getOrganizationById,
  Organization,
} from "@/lib/features/organizations";
import { deleteProject } from "@/lib/features/projects";
function getRole(roleName: string): "admin" | "user" | null {
  const role = roleName.split(".").pop();

  return ["admin", "user"].includes(role!) ? (role as "admin" | "user") : null;
}

export default function Home() {
  const [userOrganizationRole, setUserOrganizationRole] = useState<
    string | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { username, token, organization, logged, roles } = useAppSelector(
    (state) => state.auth
  );
  const { projects } = useAppSelector((state) => state.projects);

  // const organizationFull:Organization| undefined = useAppSelector((state) =>
  //   state.organizations.organizations.find((org) => org.id === organization.id)
  // );
  // console.log(organizationFull)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (logged && organization.id && token) {
      dispatch(getOrganizationById({ token, id: organization.id }));
    }
  }, [logged, token]);
  useEffect(() => {
    if (roles && roles.length > 0 && roles[0]) {
      const rolUser = getRole(roles[0].name);

      setUserOrganizationRole(rolUser);
    }
  }, [roles]);

  if (!organization || !token || !organization.id) {
    return null;
  }
  return (
    <div className="flex justify-center flex-col px-16 py-12 mx-auto max-w-[1360px] bg-neutral-100">
      {modalVisible && (
        <CrearProyectoModal onClose={() => setModalVisible(false)} />
      )}
      <div className="flex flex-col gap-2 pb-8">
        <p className="text-3xl font-semibold">Bienvenido, {username}!</p>
        <p className="text-neutral-700">
          <span className="font-bold">Organización:</span> {organization.name}
        </p>
      </div>
      <div >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Proyectos</h2>
          <div
            className={`${
              userOrganizationRole === "admin" ? "flex" : "hidden"
            }`}
          >
            <button
              className="p-2 rounded-lg border border-neutral-200 bg-emerald-500 hover:bg-emerald-400 text-neutral-100 font-semibold text-sm hover:text-white px-2.5"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Crear proyecto
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 py-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border relative border-neutral-300 w-full h-fit rounded-2xl p-4 shadow-lg hover:shadow-xl shadow-neutral-300 flex flex-col justify-between"
            >
              <div className=" w-fit h-fit flex justify-center items gap-2 flex-col">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/logo-simplify.png"
                    alt="Logo"
                    className="w-12 object-contain border-2 border-zinc-300 rounded-full p-1"
                    width={50}
                    height={50}
                  />
                  <p className="text-xl font-semibold">{project.name}</p>
                </div>
                <div className="flex flex-col gap-4 py-2">
                  {/* <div className="flex items-center gap-1 text-neutral-600 font-medium">
                  <UsersIcon className="w-4 h-4" />
                  {/* <span className="text-sm">
                    {proyect.users.length} participantes
                  </span> 
                </div> */}
                  <p className="px-0.5 text-sm py-1">{project.description}</p>
                </div>
              </div>

              <Link
                href={`/projects/${project.id}`}
                className="rounded-lg w-full h-fit p-2 border text-center border-neutral-300 font-semibold mt-2 hover hover:bg-neutral-200 text-sm"
              >
                Ver Proyecto
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
