"use client";
import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

// Message icon SVG component
const MessageIcon = () => (
  <svg
    className="w-16 h-16 mx-auto mb-6 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 8h10M7 12h4m1 8h-5a2 2 0 01-2-2v-5a2 2 0 012-2h5a2 2 0 012 2v5a2 2 0 01-2 2z"
    ></path>
  </svg>
);

export default function SimpleOtpPage() {
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
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.current.show({ severity: "warn", summary: "Warning", detail: "Please enter a 6-digit OTP", life: 3000 });
      return;
    }
    toast.current.show({ severity: "success", summary: "Success", detail: "OTP verified successfully", life: 3000 });

    // Redirect to /emailotp after a short delay to show toast
    setTimeout(() => {
      router.push("/emailverification");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex flex-col items-center justify-center p-4">
      <Toast ref={toast} />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6 text-center">
          <MessageIcon />
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <p className="text-gray-600 mb-4">Please enter the 6-digit OTP sent to your mobile</p>

          <div className="relative pt-4 text-left">
            <FloatLabel>
              <InputText
                id="otp"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full"
                placeholder="Enter OTP"
                type="text"
                required
              />
              <label htmlFor="otp" className="text-gray-700 text-xs font-semibold">
                One-Time Password (OTP) *
              </label>
            </FloatLabel>
          </div>

          <div className="text-gray-600 font-mono mb-4">Time remaining: {formatTime(timeLeft)}</div>

          <Button
            label="Verify OTP"
            icon="pi pi-check"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg py-2 shadow"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
