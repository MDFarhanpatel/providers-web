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
      data.append("fullName", formData.fullName);
      data.append("dob", formData.dob);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("zipcode", formData.zipcode);
      data.append("panNumber", formData.panNumber);
      data.append("panCardFile", formData.panCardFile);
      data.append("licenseNumber", formData.licenseNumber);
      data.append("licenseCardFile", formData.licenseCardFile);
      data.append("providerImage", formData.providerImage);

      // TODO: Replace API call below with your backend API endpoint
      // await fetch('/api/provider/kyc', { method: 'POST', body: data });

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "KYC details submitted successfully!",
        life: 3000,
      });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-2 flex items-center justify-center overflow-auto">
      <Toast ref={toast} />
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-4 space-y-6 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-6">
          Provider KYC Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* KYC Section */}
          <section className="bg-gray-50 border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold border-b border-gray-200 mb-4 pb-1">
              KYC Details
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-semibold text-xs mb-1">
                  Full Name *
                </label>
                <InputText
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-gray-700 font-semibold text-xs mb-1">
                  Date of Birth *
                </label>
                <InputText
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-semibold text-xs mb-1">
                  Address *
                </label>
                <InputTextarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded resize-none text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-700 font-semibold text-xs mb-1">
                  City *
                </label>
                <InputText
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-gray-700 font-semibold text-xs mb-1">
                  State *
                </label>
                <InputText
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="zipcode" className="block text-gray-700 font-semibold text-xs mb-1">
                  ZIP Code *
                </label>
                <InputText
                  id="zipcode"
                  value={formData.zipcode}
                  onChange={(e) => handleInputChange("zipcode", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* PAN Card Section */}
          <section className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold border-b border-gray-200 mb-4 pb-1">
              PAN Card Details
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="panNumber" className="block text-gray-700 font-semibold text-xs mb-1">
                  PAN Number *
                </label>
                <InputText
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange("panNumber", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 text-xs font-semibold" htmlFor="panCardFile">
                  Upload PAN Card Scan *
                </label>
                <input
                  type="file"
                  id="panCardFile"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileSelect("panCardFile", e.target.files)}
                  className="block w-full p-2 border border-gray-300 rounded cursor-pointer text-xs"
                  required
                />
                {formData.panCardFile && <p className="mt-1 text-xs text-green-600 truncate">{formData.panCardFile.name}</p>}
              </div>
            </div>
          </section>

          {/* License Card Section */}
          <section className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold border-b border-gray-200 mb-4 pb-1">
              License Card Details
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="licenseNumber" className="block text-gray-700 font-semibold text-xs mb-1">
                  License Number *
                </label>
                <InputText
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  required
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 text-xs font-semibold" htmlFor="licenseCardFile">
                  Upload License Card Scan *
                </label>
                <input
                  type="file"
                  id="licenseCardFile"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileSelect("licenseCardFile", e.target.files)}
                  className="block w-full p-2 border border-gray-300 rounded cursor-pointer text-xs"
                  required
                />
                {formData.licenseCardFile && <p className="mt-1 text-xs text-green-600 truncate">{formData.licenseCardFile.name}</p>}
              </div>
            </div>
          </section>

          {/* Provider Image Upload Section */}
          <section className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold border-b border-gray-200 mb-4 pb-1">
              Provider Image Upload
            </h3>
            <div>
              <label className="block mb-2 text-gray-700 text-xs font-semibold" htmlFor="providerImage">
                Upload Provider Image *
              </label>
              <input
                type="file"
                id="providerImage"
                accept="image/*"
                onChange={(e) => handleFileSelect("providerImage", e.target.files)}
                className="block w-full p-2 border border-gray-300 rounded cursor-pointer text-xs"
                required
              />
              {formData.providerImage && <p className="mt-1 text-xs text-green-600 truncate">{formData.providerImage.name}</p>}
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              label={loading ? "Submitting..." : "Submit KYC"}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow text-xs"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
