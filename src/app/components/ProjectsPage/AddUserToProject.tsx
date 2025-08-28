"use client";

import { useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
};

type Props = {
  users: User[];
  onClose: () => void;
  onSave: (updatedUsers: User[]) => void;
};

export default function UserGestionModal({ users, onClose, onSave }: Props) {
  const [userList, setUserList] = useState<User[]>(users);

  const handleUserChange = (index: number, field: keyof User, value: string) => {
    const updatedUsers = [...userList];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    setUserList(updatedUsers);
  };

  const handleAddUser = () => {
    setUserList([
      ...userList,
      {
        id: Date.now().toString(),
        username: "",
        email: "",
      },
    ]);
  };

  const handleRemoveUser = (index: number) => {
    const updatedUsers = [...userList];
    updatedUsers.splice(index, 1);
    setUserList(updatedUsers);
  };

  const handleSave = () => {
    onSave(userList);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl text-black relative overflow-y-auto shadow-lg border border-neutral-300 max-h-[90vh]">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestionar usuarios</h2>

        <div className="space-y-4">
          {userList.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-neutral-50 p-4 rounded-md shadow-sm"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => handleUserChange(index, "username", e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleUserChange(index, "email", e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div className="flex items-center justify-end pt-4 md:pt-0">
                <button
                  onClick={() => handleRemoveUser(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddUser}
          className="mt-6 text-sm text-emerald-600 hover:underline"
        >
          + Agregar nuevo usuario
        </button>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 transition text-white"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
