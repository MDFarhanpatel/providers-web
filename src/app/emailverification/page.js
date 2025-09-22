"use client";
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FloatLabel } from "primereact/floatlabel";
import { useRouter } from "next/navigation";

export default function EmailVerificationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  const router = useRouter();

  const validateForm = () => {
    if (!email) {
      toast.current.show({ severity: "warn", summary: "Validation Error", detail: "Email is required", life: 3000 });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.current.show({ severity: "warn", summary: "Validation Error", detail: "Invalid email format", life: 3000 });
      return false;
    }
    if (!password) {
      toast.current.show({ severity: "warn", summary: "Validation Error", detail: "Password is required", life: 3000 });
      return false;
    }
    if (password.length < 6) {
      toast.current.show({ severity: "warn", summary: "Validation Error", detail: "Password must be at least 6 characters", life: 3000 });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast.current.show({ severity: "success", summary: "Success", detail: "Email verified, redirecting to OTP page...", life: 3000 });
    setTimeout(() => {
      router.push("/emailotp");
    }, 1600);
  };

  const handleForgetPassword = () => {
    toast.current.show({ severity: "info", summary: "Redirecting", detail: "Redirecting to Forgot Password page...", life: 2000 });
    setTimeout(() => {
      router.push("/forgot-password"); // Redirect after showing toast
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-6">
      <Toast ref={toast} />
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Email Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FloatLabel>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                required
                className="w-full px-3 py-2"
              />
              <label htmlFor="email" className="text-gray-700 font-semibold text-xs">Email *</label>
            </FloatLabel>
          </div>
          <div className="relative">
            <FloatLabel>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
                placeholder="Enter your password"
                required
                inputClassName="w-full px-3 py-2"
              />
              <label htmlFor="password" className="text-gray-700 font-semibold text-xs">Password *</label>
            </FloatLabel>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-indigo-500 hover:text-indigo-700 text-sm font-semibold focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            label="Verify Email"
            icon="pi pi-envelope"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg py-3 shadow"
          />
        </form>
      </div>
    </div>
  );
}
