import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // db vem do seu firebase.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);

      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const dados = docSnap.data();
            setAdmin(dados.role === "admin");
          } else {
            setAdmin(false);
          }
        } catch (error) {
          console.error("Erro ao buscar role do usuário:", error);
          setAdmin(false);
        }
      } else {
        setAdmin(false);
      }

      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, admin }}>
      {!carregando && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
