"use client";
import { logout, validate } from "@/apis";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const authContex = createContext();

export const useAuthContex = () => useContext(authContex);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data?.status !== "success") throw new Error(data?.message);
      localStorage.removeItem("AuthToken");
      // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      setUser(null);
      setIsAuth(false);
      toast.success("User logged out successfully");
      setTimeout(() => {
        router.replace("/login");
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/contact"
    ) {
      return;
    }
    const checkAuth = async () => {
      const token = localStorage.getItem("AuthToken");

      if (!token) {
        setIsAuth(false);
        setUser(null);
        router.replace("/login");
        return;
      }

      // try {
      //   const { data } = await validate(); // Pass token to the validate API
      //   if (data?.status !== "success") throw new Error(data?.message);
      //   setUser(data?.data?.user);
      //   setIsAuth(true);
      // } catch (err) {
      //   console.error(err);
      //   setIsAuth(false);
      //   router.push("/login");
      // }
    };

    checkAuth();
  }, [pathname, setIsAuth, router]);

  const value = { user, setUser, handleLogout, isAuth, setIsAuth };

  return <authContex.Provider value={value}>{children}</authContex.Provider>;
};
