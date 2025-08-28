"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createProject } from "@/lib/features/projects";

type Props = {
  onClose: () => void;
};

export default function CrearProyectoModal({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const {
    username,
    token,
    organization,
    id
  } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [description, setDescription] = useState("");
  const [storageBucket, setStorageBucket] = useState("");
  const [storagePrefix, setStoragePrefix] = useState("");
  const [dbInstance, setDbInstance] = useState("");
  const [dbName, setDbName] = useState("");

  const handleCreateProject = () => {
    
    const projectData = {
      name,
      prefix,
      description,
      storage_bucket: storageBucket,
      storage_prefix: storagePrefix,
      db_name: dbName,
      db_instance: dbInstance,
      created_by_uuid: id,
      created_by_info: username,
      organization_ids: [organization?.id],
      owner_uuid: id,
    };
    console.log(projectData)
    if(token){
      dispatch(createProject({projectData,token}));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl text-black relative overflow-y-auto shadow-lg border border-neutral-300">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Crear nuevo proyecto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label>
            <span className="block text-sm mb-1 font-medium">Nombre del proyecto:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </label>

          <label>
            <span className="block text-sm mb-1 font-medium">Prefijo del proyecto:</span>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
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

          <label>
            <span className="block text-sm mb-1 font-medium">Storage Bucket:</span>
            <input
              type="text"
              value={storageBucket}
              onChange={(e) => setStorageBucket(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </label>

          <label>
            <span className="block text-sm mb-1 font-medium">Storage Prefix:</span>
            <input
              type="text"
              value={storagePrefix}
              onChange={(e) => setStoragePrefix(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </label>

          <label>
            <span className="block text-sm mb-1 font-medium">DB Instance:</span>
            <input
              type="text"
              value={dbInstance}
              onChange={(e) => setDbInstance(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </label>

          <label>
            <span className="block text-sm mb-1 font-medium">Nombre de la base de datos:</span>
            <input
              type="text"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md"
            />
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateProject}
            className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 transition text-white"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
