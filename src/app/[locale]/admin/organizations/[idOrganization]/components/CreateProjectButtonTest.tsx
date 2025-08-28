"use client";

import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { deleteOrganization } from "@/lib/features/organizations";

type DeleteOrganizationProps = {
  token: string;
  organizationId: string;
  onClose: () => void;
};

const DeleteOrganization: React.FC<DeleteOrganizationProps> = ({
  token,
  organizationId,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteOrganization({ token, organizationId }))
      .unwrap()
      .then((res) => {
        console.log("Organización eliminada:", res);
        onClose();
      })
      .catch((err) => {
        console.error("Error al eliminar la organización:", err);
      });
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Eliminar Organización
      </button>
    </div>
  );
};

export default DeleteOrganization;
