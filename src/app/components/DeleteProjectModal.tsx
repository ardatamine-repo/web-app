"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { deleteProject } from "@/lib/features/projects";
import { useRouter } from "next/navigation";

type DeleteProjectModalProps = {
  token: string;
  idProject: string;
  onClose: () => void;
};

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  token,
  idProject,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setLoading(true);

    dispatch(deleteProject({ token, idProject }))
      .unwrap()
      .then((res) => {
        console.log("Proyecto eliminado:", res);
        router.push("/");
      })
      .catch((err) => {
        console.error("Error al eliminar el proyecto:", err);
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-white text-neutral-800 w-full max-w-md rounded-2xl shadow-2xl p-8 mx-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          ¿Eliminar Proyecto?
        </h2>
        <p className="text-sm text-neutral-600 text-center mb-6">
          Esta acción no se puede deshacer. ¿Estás seguro de que deseas
          eliminar este proyecto?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-sm font-semibold transition disabled:opacity-50"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
