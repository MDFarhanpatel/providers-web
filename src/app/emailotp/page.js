"use client";
import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

// Gmail style envelope icon with Gmail colors
const GmailIcon = () => (
  <svg
    className="w-16 h-16 mx-auto mb-6"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="8" fill="#FFFFFF" />
    <path
      d="M6 12L24 28L42 12"
      stroke="#D93025"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12V36C6 38.2091 7.79086 40 10 40H38C40.2091 40 42 38.2091 42 36V12"
      stroke="#4285F4"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42 12L24 28L6 12"
      stroke="#F4B400"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 28V40"
      stroke="#0F9D58"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EmailOtpVerificationPage() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown seconds
  const toast = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please enter a 6-digit OTP",
        life: 3000,
      });
      return;
    }
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "OTP verified successfully",
      life: 3000,
    });

    // Redirect to /login after a short delay to show toast
    setTimeout(() => {
      router.push("/login");
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
      <Toast ref={toast} />
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center">
        <GmailIcon />
        <h2 className="text-2xl font-bold mb-2">Email OTP Verification</h2>
        <p className="text-gray-700 mb-6">
          Enter the 6-digit OTP sent to your Gmail address
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative pt-4 text-left">
            <FloatLabel>
              <InputText
                id="emailOtp"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter OTP"
                type="text"
                className="w-full"
                required
              />
              <label
                htmlFor="emailOtp"
                className="text-gray-700 font-semibold text-xs"
              >
                One-Time Password (OTP) *
              </label>
            </FloatLabel>
          </div>

          <div className="text-gray-700 font-mono mb-4">
            Time Remaining: {formatTime(timeLeft)}
          </div>

          <Button
            label="Verify OTP"
            icon="pi pi-check"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg py-2 shadow"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
