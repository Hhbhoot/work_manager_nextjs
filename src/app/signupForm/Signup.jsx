"use client";
import React, { useState } from "react";
import Step1 from "@/components/SignUp/Step1";
import Step2 from "@/components/SignUp/Step2";
import Step3 from "@/components/SignUp/Step3";
import Step4 from "@/components/SignUp/Step4";
import toast from "react-hot-toast";
import { signup } from "@/apis";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
    age: "",
  });
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.gender ||
      !formData.age
    ) {
      return toast.error("Please provide all required fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Signing Up...");
    try {
      const { data } = await signup(formData);
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }

      toast.success(data?.message, {
        id: toastId,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        about: "",
        age: "",
      });

      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, {
        id: toastId,
      });
    }
  };

  return (
    <>
      {console.log("step===>", typeof step)}
      {step == 1 && (
        <Step1
          formData={formData}
          nextStep={nextStep}
          setFormData={setFormData}
        />
      )}
      {step == 2 && (
        <Step2
          formData={formData}
          nextStep={nextStep}
          previousStep={previousStep}
          setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          nextStep={nextStep}
          previousStep={previousStep}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <Step4
          formData={formData}
          previousStep={previousStep}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Signup;
