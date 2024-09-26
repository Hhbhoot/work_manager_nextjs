"use client";
import { Features, WelcomeBanner, Testimonials } from "@/components";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContex } from "@/Contex/AuthContex";

export default function Home() {
  const { user } = useAuthContex();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    console.log("AuthToken:", token);
    console.log("User state on / route:", user); // Check if user is set
    if (!token) {
      router.replace("/login");
    }
  }, [router, user]); // Make sure to include necessary dependencies

  return (
    <div className="text-white">
      <WelcomeBanner />
      <Features />
      <Testimonials />
    </div>
  );
}
