"use client";
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FloatLabel } from "primereact/floatlabel";
import { useRouter } from "next/navigation";

export default function ProviderKycForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    panNumber: "",
    licenseNumber: "",
    panCardFile: null,
    licenseCardFile: null,
    providerImage: null,
  });

  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (field, files) => {
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [field]: files[0] }));
    }
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipcode
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please fill all KYC required fields",
        life: 3000,
      });
      return false;
    }
    if (!formData.panNumber) {
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please enter PAN number",
        life: 3000,
      });
      return false;
    }
    if (!formData.panCardFile) {
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please upload PAN card scan",
        life: 3000,
      });
      return false;
    }
    if (!formData.licenseNumber) {
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please enter License number",
        life: 3000,
      });
      return false;
    }
    if (!formData.licenseCardFile) {
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please upload License card scan",
        life: 3000,
      });
      return false;
    }
    if (!formData.providerImage) {
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please upload your image",
        life: 3000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      // KYC section
      data.append("fullName", formData.fullName);
      data.append("dob", formData.dob);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("zipcode", formData.zipcode);
      // PAN section
      data.append("panNumber", formData.panNumber);
      data.append("panCardFile", formData.panCardFile);
      // License section
      data.append("licenseNumber", formData.licenseNumber);
      data.append("licenseCardFile", formData.licenseCardFile);
      // Provider image
      data.append("providerImage", formData.providerImage);

      // TODO: Replace API call below with your backend API endpoint
      // await fetch('/api/provider/kyc', { method: 'POST', body: data });

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "KYC details submitted successfully!",
        life: 3000,
      });

      // Optionally redirect to dashboard or another page
      // router.push('/dashboard');
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to submit KYC details. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8 flex items-center justify-center overflow-auto">
      <Toast ref={toast} />
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 space-y-10 max-h-[90vh] overflow-auto">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
          Provider KYC Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* KYC Details Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold border-b border-gray-200 mb-6 pb-2">
              KYC Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FloatLabel>
                <InputText
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="name"
                />
                <label
                  htmlFor="fullName"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Full Name *
                </label>
              </FloatLabel>

              <FloatLabel>
                <InputText
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="bday"
                />
                <label
                  htmlFor="dob"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Date of Birth *
                </label>
              </FloatLabel>

              <FloatLabel className="sm:col-span-2">
                <InputTextarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="street-address"
                />
                <label
                  htmlFor="address"
                  className="text-gray-700 text-sm font-semibold"
                >
                  Address *
                </label>
              </FloatLabel>

              <FloatLabel>
                <InputText
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="address-level2"
                />
                <label
                  htmlFor="city"
                  className="text-gray-700 text-sm font-semibold"
                >
                  City *
                </label>
              </FloatLabel>

              <FloatLabel>
                <InputText
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="address-level1"
                />
                <label
                  htmlFor="state"
                  className="text-gray-700 text-sm font-semibold"
                >
                  State *
                </label>
              </FloatLabel>

              <FloatLabel>
                <InputText
                  id="zipcode"
                  value={formData.zipcode}
                  onChange={(e) => handleInputChange("zipcode", e.target.value)}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="postal-code"
                />
                <label
                  htmlFor="zipcode"
                  className="text-gray-700 text-sm font-semibold"
                >
                  ZIP Code *
                </label>
              </FloatLabel>
            </div>
          </section>

          {/* PAN Card Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold border-b border-gray-200 mb-6 pb-2">
              PAN Card Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <FloatLabel>
                <InputText
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange("panNumber", e.target.value)}
                  required
                  className="w-full px-3 py-2"
                  autoComplete="off"
                />
                <label
                  htmlFor="panNumber"
                  className="text-gray-700 text-sm font-semibold"
                >
                  PAN Number *
                </label>
              </FloatLabel>
              <div>
                <label
                  className="block mb-2 text-gray-700 text-sm font-semibold"
                  htmlFor="panCardFile"
                >
                  Upload PAN Card Scan *
                </label>
                <input
                  type="file"
                  id="panCardFile"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileSelect("panCardFile", e.target.files)}
                  className="block w-full p-2 border border-gray-300 rounded cursor-pointer"
                  required
                />
                {formData.panCardFile && (
                  <p className="mt-1 text-sm text-green-600 truncate">
                    {formData.panCardFile.name}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* License Card Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold border-b border-gray-200 mb-6 pb-2">
              License Card Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <FloatLabel>
                <InputText
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                  required
                  className="w-full px-3 py-2"
                  autoComplete="off"
                />
                <label
                  htmlFor="licenseNumber"
                  className="text-gray-700 text-sm font-semibold"
                >
                  License Number *
                </label>
              </FloatLabel>
              <div>
                <label
                  className="block mb-2 text-gray-700 text-sm font-semibold"
                  htmlFor="licenseCardFile"
                >
                  Upload License Card Scan *
                </label>
                <input
                  type="file"
                  id="licenseCardFile"
                  accept="image/*,application/pdf"
                  onChange={(e) =>
                    handleFileSelect("licenseCardFile", e.target.files)
                  }
                  className="block w-full p-2 border border-gray-300 rounded cursor-pointer"
                  required
                />
                {formData.licenseCardFile && (
                  <p className="mt-1 text-sm text-green-600 truncate">
                    {formData.licenseCardFile.name}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Provider Image Upload Section */}
          <section className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold border-b border-gray-200 mb-6 pb-2">
              Provider Image Upload
            </h3>
            <div>
              <label
                className="block mb-2 text-gray-700 text-sm font-semibold"
                htmlFor="providerImage"
              >
                Upload Provider Image *
              </label>
              <input
                type="file"
                id="providerImage"
                accept="image/*"
                onChange={(e) => handleFileSelect("providerImage", e.target.files)}
                className="block w-full p-2 border border-gray-300 rounded cursor-pointer"
                required
              />
              {formData.providerImage && (
                <p className="mt-1 text-sm text-green-600 truncate">
                  {formData.providerImage.name}
                </p>
              )}
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              label={loading ? "Submitting..." : "Submit KYC"}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
