"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createProject, updateProject } from "@/lib/features/projects";

type Project = {
  id: string;
  name: string;
  prefix: string;
  description: string;
  storage_bucket: string;
  storage_prefix: string;
  db_name: string;
  db_instance: string;
  organization_ids: string[];
  owner_uuid: string;
  created_by_uuid: string;
  created_by_info: string;
};

type Props = {
  onClose: () => void;
  project?: any; // opcional: si está, estamos editando
};

export default function UpdateProyectoModal({ onClose, project }: Props) {
  const dispatch = useAppDispatch();
  const { username, token, organization, id } = useAppSelector(
    (state) => state.auth
  );

  // Estados del formulario
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [description, setDescription] = useState("");
  const [storageBucket, setStorageBucket] = useState("");
  const [storagePrefix, setStoragePrefix] = useState("");
  const [dbInstance, setDbInstance] = useState("");
  const [dbName, setDbName] = useState("");

  // Si se pasa un proyecto, llenamos los campos
  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setPrefix(project.prefix || "");
      setDescription(project.description || "");
      setStorageBucket(project.storage_bucket || "");
      setStoragePrefix(project.storage_prefix || "");
      setDbInstance(project.db_instance || "");
      setDbName(project.db_name || "");
    }
  }, [project]);

  const handleSaveProject = () => {
    const projectData = {
      id:project.id,
      name,
      description,
      
    };
    console.log(projectData)
    if (token) {
      if (project) {
        dispatch(
          updateProject({
            projectId: project.id,
            updatedData: projectData,
            token,
          })
        );
      } else {
        dispatch(updateProject({ projectData, token }));
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl text-black relative overflow-y-auto shadow-lg border border-neutral-300">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {project ? "Editar proyecto" : "Crear nuevo proyecto"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label>
            <span className="block text-sm mb-1 font-medium">
              Nombre del proyecto:
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm mb-1 font-medium">Descripción:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2 border border-neutral-300 rounded-md resize-none"
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveProject}
            className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 transition text-white"
          >
            {project ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
