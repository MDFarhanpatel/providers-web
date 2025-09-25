"use client";
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useRef(null);
  const router = useRouter();

  const backendBaseUrl = "https://car-rental12-nu.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${backendBaseUrl}/api/v1/providers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome, ${username}! Redirecting to dashboard...`,
          life: 3000,
        });

        if (data.token) {
          localStorage.setItem("providerToken", data.token);
        }

        setTimeout(() => {
          router.push("/providers/dashboard");
        }, 1500);
      } else {
        if (res.status === 404) {
          setError(data.error || "No email found. Please register first.");
          toast.current.show({
            severity: "warn",
            summary: "User Not Found",
            detail: data.error || "Please register first.",
            life: 4000,
          });
        } else {
          setError(data.error || "Login failed. Please check your credentials.");
          toast.current.show({
            severity: "error",
            summary: "Login Failed",
            detail: data.error || "Please try again.",
            life: 3000,
          });
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
      toast.current.show({
        severity: "error",
        summary: "Network Error",
        detail: "Unable to reach server.",
        life: 3000,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-3 flex items-center justify-center relative overflow-hidden">
      <Toast ref={toast} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-10"></div>
        <div className="absolute top-[20%] right-[15%] w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-[20%] left-[20%] w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full opacity-8"></div>
        <div className="absolute bottom-[10%] right-[10%] w-7 h-7 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-10"></div>
      </div>

      <div className="w-full max-w-xs mx-auto bg-white/95 backdrop-blur-md border border-gray-200/30 rounded-xl shadow-2xl p-4 sm:p-5 relative z-10">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full shadow-lg mb-2">
            <i className="pi pi-user text-white text-lg"></i>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent mb-1">
            Providers Web
          </h1>
          <p className="text-gray-600 font-medium text-xs">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-3">
            <Message severity="error" text={error} className="w-full text-xs" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FloatLabel>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:border-gray-600 focus:ring-1 focus:ring-gray-600/20 outline-none"
              />
              <label htmlFor="username" className="text-gray-700 font-semibold text-xs">
                Username (Email)
              </label>
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
                required
                inputClassName="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:border-gray-600 focus:ring-1 focus:ring-gray-600/20 outline-none"
              />
              <label htmlFor="password" className="text-gray-700 font-semibold text-xs">
                Password
              </label>
            </FloatLabel>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-1.5 accent-gray-600 w-3 h-3" />
              <label htmlFor="remember" className="text-gray-700 font-medium text-xs">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-700 font-semibold text-xs transition-colors duration-300 no-underline"
            >
              Forgot?
            </a>
          </div>

          <Button
            type="submit"
            label={loading ? "Signing in..." : "Sign In"}
            icon={loading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
            loading={loading}
            disabled={!username || !password}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
          />
        </form>

        <div className="text-center mt-4 pt-3 border-t border-gray-100">
          <p className="text-gray-600 text-xs mb-3">New provider? Join our network</p>
          <Button
            type="button"
            label="Register as Provider"
            icon="pi pi-user-plus"
            onClick={() => router.push("/register")}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-none text-sm"
          />
          <p className="text-gray-500 text-xs mt-2">Already have an account? Just sign in above</p>
        </div>
      </div>
    </div>
  );
}
