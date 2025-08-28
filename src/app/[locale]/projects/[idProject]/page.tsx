"use client";
import DeleteProjectModal from "@/app/components/DeleteProjectModal";
import Loading from "@/app/components/Loading";
import UserGestionModal from "@/app/components/ProjectsPage/AddUserToProject";
import UpdateProyectoModal from "@/app/components/UpdateProyectModal";
import { deleteProject, getProjectById } from "@/lib/features/projects";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { use, useEffect, useState } from "react";
function getRole(permission: string): "owner" | "editor" | "viewer" | null {
  const role = permission.split(".").pop();

  return ["owner", "editor", "viewer"].includes(role!)
    ? (role as "owner" | "editor" | "viewer")
    : null;
}
type PermissionRole = "owner" | "editor" | "viewer" | null;
interface PageProps {
  params: Promise<{
    idProject: string;
  }>;
}
interface PermissionPillProps {
  permissionString: string; // Ejemplo: "ExPozo1.owner"
  size?: "sm" | "md" | "xl"; // Ejemplo: "ExPozo1.owner"
}

const roleColors: Record<string, string> = {
  owner: "bg-yellow-100 text-yellow-700",
  editor: "bg-blue-100 text-blue-700",
  viewer: "bg-green-100 text-green-700",
};

const PermissionPill: React.FC<PermissionPillProps> = ({
  permissionString,
  size = "sm",
}) => {
  const role = permissionString.split(".").pop(); // obtiene "owner", "editor" o "viewer"

  if (!role || !["owner", "editor", "viewer"].includes(role)) {
    return null; // si no es un rol válido, no muestra nada
  }

  return (
    <span
      className={`px-2 py-1 rounded-full font-semibold ${roleColors[role]} 
    ${size === "xl" && "text-lg"}
    ${size === "md" && "text-base"}
    ${size === "sm" && "text-xs"}
    `}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};
function generarPrefix(nombre: string) {
  const palabrasIgnoradas = ["de", "la", "del", "los", "las", "y", "en", "el"];

  return nombre
    .toLowerCase()
    .split(" ")
    .filter((palabra) => !palabrasIgnoradas.includes(palabra))
    .map((palabra) => {
      if (palabra.length <= 3) return palabra; // si es corta, úsala completa
      return palabra.slice(0, 2); // usa las primeras dos letras
    })
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}
console.log(generarPrefix("Exploración de pozos"));
const getIniciales = (nombre: string) => {
  const partes = nombre.split(" ");
  const iniciales = partes
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return iniciales.toUpperCase();
};
export default function ProjectDetailPage({ params }: PageProps) {
  const [projectPermission, setProjectPermission] = useState<PermissionRole>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpodateModal, setShowUpodateModal] = useState(false);
  const [showEditUsers,setShowEditUsers]=useState(false)
  const { idProject } = use(params);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("subidos");
  const { token, logged, roles, direct_permissions, id } = useAppSelector(
    (state) => state.auth
  );
  const project = useAppSelector(
    (state) => state.projects.fullProjects[idProject]
  );
  useEffect(() => {
    if (idProject && token && logged) {
      dispatch(getProjectById({ id: idProject, token }));
    }
  }, [idProject, token, logged, dispatch]);
  useEffect(() => {
    if (project && direct_permissions) {
      direct_permissions.forEach((perm) => {
        const permiso = project.available_permissions.find(
          (p) => p.id === perm.id
        );
        if (permiso) {
          const role = getRole(perm.name);
          console.log(role);
          setProjectPermission(role);
        }
      });
    }
  }, [project, direct_permissions]);
  if (!project) {
    return <Loading />;
  }

  const datosSubidos = [
    {
      nombre: "sat_data_enero.csv",
      fecha: "2025-06-01",
      estado: "Pendiente",
      progreso: 0,
    },
    {
      nombre: "sat_data_febrero.csv",
      fecha: "2025-06-05",
      estado: "Pendiente",
      progreso: 0,
    },
  ];

  const procesos = [
    {
      nombre: "clima_marzo.json",
      fecha: "2025-06-10",
      estado: "En proceso",
      progreso: 45,
    },
    {
      nombre: "tráfico_abril.csv",
      fecha: "2025-06-12",
      estado: "En proceso",
      progreso: 70,
    },
  ];

  const datosFinalizados = [
    {
      nombre: "resumen_final.xlsx",
      fecha: "2025-06-15",
      estado: "Finalizado",
      progreso: 100,
    },
  ];

  return (
    <div className="flex justify-center flex-col px-16 py-8 bg-white text-neutral-800">
      {showDeleteModal && token && (
        <DeleteProjectModal
          token={token}
          idProject={project.id}
          onClose={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
      {showUpodateModal && (
        <UpdateProyectoModal
          onClose={() => {
            setShowUpodateModal(false);
          }}
          project={project}
        />
      )}
      {showEditUsers&&project.users&&<UserGestionModal users={project.users} onClose={()=>{
        setShowEditUsers(false)
      }} onSave={()=>{

      }}/>}
      <div className="flex justify-between w-full pb-2">
        <Link href={"/"} className="mb-4">
          <ArrowLeftIcon className="h-5 w-5 text-neutral-600 hover:text-neutral-800 hover:scale-110 cursor-pointer" />
        </Link>
        {projectPermission === "owner" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {setShowUpodateModal(true)}}
              className=" text-sm   p-2 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
            >
              Editar Project
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
              }}
              className=" text-sm   p-2 rounded-xl border border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Eliminar Project
            </button>
          </div>
        )}
      </div>
      <div className="flex mb-10 justify-between">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-6 flex items-center gap-4">
            {project.name}
            {direct_permissions && (
              <PermissionPill
                size={"md"}
                permissionString={direct_permissions[0].name}
              />
            )}
          </h1>

          {/* Detalles */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div>
              <h2 className="text-lg font-semibold text-neutral-700 mb-1">
                Descripción
              </h2>
              <p className="text-neutral-600">{project.description}</p>
            </div>
          </div>
        </div>
        <div className="border border-neutral-300 rounded-xl p-4 w-fit min-w-80 relative">
          <span className="absolute top-4 right-4 h-4 w-4 text-neutral-600 hover:text-emerald-400" onClick={()=>{
            setShowEditUsers(true)
          }}><PencilSquareIcon/></span>
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">
            Usuarios encargados
          </h2>
          <ul className="space-y-1">
            {project.users?.map((user, index) => (
              <li
                key={index}
                className="text-sm text-neutral-700 border-b border-neutral-200 py-1 flex justify-between w-fit items-center gap-4"
              >
                <div className="rounded-full border h-6 w-6 flex items-center justify-center text-center bg-emerald-200 border-neutral-300 ">
                  {getIniciales(user.username)}
                </div>
                <span>{user.username}</span>
                {/* {user.direct_permissions[0]} */}
                <PermissionPill permissionString={user.direct_permissions[0]} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div>
        {/* Tab headers */}
        <div className="flex space-x-4 border-b border-neutral-300 mb-6">
          {[
            { id: "subidos", label: "Datos Subidos" },
            { id: "procesos", label: "Procesos" },
            { id: "finalizados", label: "Datos Finalizados" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? "border-emerald-500 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 min-h-[200px] overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-neutral-700">
            <thead className="text-xs uppercase text-neutral-500 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-2">Archivo</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Progreso</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "subidos"
                ? datosSubidos
                : activeTab === "procesos"
                ? procesos
                : datosFinalizados
              ).map((archivo, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-200 hover:bg-neutral-100"
                >
                  <td className="px-4 py-2">{archivo.nombre}</td>
                  <td className="px-4 py-2">{archivo.fecha}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold
                        ${
                          archivo.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : archivo.estado === "En proceso"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {archivo.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 w-40">
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${archivo.progreso}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-2">{archivo.progreso}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
