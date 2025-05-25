import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import React from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  const toggleAdmin = async (userId, isAdmin) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: isAdmin ? "user" : "admin",
    });
    fetchUsers(); // Atualiza a lista
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Função</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <button
                  className={`px-3 py-1 rounded ${
                    user.role === "admin" ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                  onClick={() => toggleAdmin(user.id, user.role === "admin")}
                >
                  {user.role === "admin" ? "Remover Admin" : "Tornar Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
