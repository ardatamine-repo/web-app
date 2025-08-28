"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { deleteOrganization } from "@/lib/features/organizations";
import { useRouter } from "next/navigation";

type DeleteOrganizationModalProps = {
  token: string;
  organizationId: string;
  onClose: () => void;
};

const DeleteOrganizationModal: React.FC<DeleteOrganizationModalProps> = ({
  token,
  organizationId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setLoading(true);

    dispatch(deleteOrganization({ token, organizationId }))
      .unwrap()
      .then((res) => {
        console.log("Organización eliminada:", res);
        router.push("/admin");
      })
      .catch((err) => {
        console.error("Error al eliminar la organización:", err);
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-y-auto">
      <div className="w-full max-w-md mx-auto mt-24 mb-16 bg-slate-900 border border-slate-700 rounded-xl shadow-xl relative p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">
          ¿Estás seguro que deseas eliminar la organización?
        </h2>
        <p className="text-sm text-slate-300 mb-6 text-center">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-slate-600 hover:bg-slate-500 text-white transition disabled:opacity-60"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className={`px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition ${
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

export default DeleteOrganizationModal;
