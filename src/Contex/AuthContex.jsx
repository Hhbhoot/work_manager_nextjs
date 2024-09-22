"use client";
import { logout, validate } from "@/apis";
import { usePathname } from "next/navigation"; // Import the hook to get the current path
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export const authContex = createContext();

export const useAuthContex = () => useContext(authContex);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data?.status !== "success") throw new Error(data?.message);
      setUser(null);
      toast.success(data?.message);
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.response?.message || err?.message);
    }
  };
  const value = { user, setUser, handleLogout };

  return <authContex.Provider value={value}>{children}</authContex.Provider>;
};
