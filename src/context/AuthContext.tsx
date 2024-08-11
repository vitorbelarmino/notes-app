"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/index";

type AuthContextType = {
  userId: string;
};
export const AuthContext = createContext({} as AuthContextType);

export const Auth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");

  const createUser = async () => {
    try {
      const { data } = await api.post("/user/create");

      localStorage.setItem("coreLab.user_id", data.userId);
      setUserId(data.userId);
    } catch (error) {
      console.warn(error);
    }
  };
  const getUserId = async () => {
    const useId = localStorage.getItem("coreLab.user_id");
    if (useId) {
      try {
        await api.get(`/user/${useId}`);
        setUserId(useId);
      } catch (error: any) {
        if (error.response.data.error === "User não encontrado") {
          localStorage.removeItem("coreLab.user_id");
          createUser();
        }
        console.warn(error);
      }
    } else {
      createUser();
    }
  };

  useEffect(() => {
    getUserId();
  }, []);
  return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
}
