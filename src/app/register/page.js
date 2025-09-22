"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13 app router useRouter
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

export default function RegisterPage() {
  const router = useRouter();
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const floatLabelWrapperClass = "relative pt-4";

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipcode ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all required fields');
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields', life: 3000 });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Passwords do not match', life: 3000 });
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Password must be at least 6 characters', life: 3000 });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter a valid email address', life: 3000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      // Simulate API call or registration logic here
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Registration successful! Redirecting...', life: 3000 });

      setSuccess('Registration successful! You can now login with your credentials.');

      // After short delay, redirect to OTP validation page
      setTimeout(() => {
        router.push('/validateotp');
      }, 3200);

      // Optionally reset form data here if needed
      // setFormData({
      //   name: '',
      //   email: '',
      //   mobile: '',
      //   address: '',
      //   city: '',
      //   state: '',
      //   zipcode: '',
      //   username: '',
      //   password: '',
      //   confirmPassword: ''
      // });
    } catch {
      setError('Registration failed. Please try again.');
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Registration failed. Please try again.', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-3 flex items-center justify-center relative overflow-auto">
      <Toast ref={toast} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-10"></div>
        <div className="absolute top-[20%] right-[15%] w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-[20%] left-[20%] w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full opacity-8"></div>
        <div className="absolute bottom-[10%] right-[10%] w-7 h-7 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-10"></div>
      </div>

      <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-md border border-gray-200/30 rounded-xl shadow-2xl p-5 relative z-10 my-4 overflow-auto max-h-[90vh]">
        <div className="text-center mb-6 px-2 sm:px-0">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg mb-2">
            <i className="pi pi-user-plus text-white text-lg"></i>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent mb-1">
            Provider Registration
          </h1>
          <p className="text-gray-600 font-medium text-xs">
            Join our network of service providers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-2 sm:px-0">
          {/* Name */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="name" className="text-gray-700 font-semibold text-xs">
                Name *
              </label>
            </FloatLabel>
          </div>

          {/* Email */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="email" className="text-gray-700 font-semibold text-xs">
                Email Address *
              </label>
            </FloatLabel>
          </div>

          {/* Mobile */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="mobile"
                value={formData.mobile}
                onChange={e => handleInputChange('mobile', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="mobile" className="text-gray-700 font-semibold text-xs">
                Mobile Number *
              </label>
            </FloatLabel>
          </div>

          {/* Address */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputTextarea
                id="address"
                value={formData.address}
                onChange={e => handleInputChange('address', e.target.value)}
                rows={2}
                className="w-full"
              />
              <label htmlFor="address" className="text-gray-700 font-semibold text-xs">
                Address *
              </label>
            </FloatLabel>
          </div>

          {/* City */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="city"
                value={formData.city}
                onChange={e => handleInputChange('city', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="city" className="text-gray-700 font-semibold text-xs">
                City *
              </label>
            </FloatLabel>
          </div>

          {/* State */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="state"
                value={formData.state}
                onChange={e => handleInputChange('state', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="state" className="text-gray-700 font-semibold text-xs">
                State *
              </label>
            </FloatLabel>
          </div>

          {/* Zipcode */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="zipcode"
                value={formData.zipcode}
                onChange={e => handleInputChange('zipcode', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="zipcode" className="text-gray-700 font-semibold text-xs">
                ZIP Code *
              </label>
            </FloatLabel>
          </div>

          {/* Username */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <InputText
                id="username"
                value={formData.username}
                onChange={e => handleInputChange('username', e.target.value)}
                required
                className="w-full"
              />
              <label htmlFor="username" className="text-gray-700 font-semibold text-xs">
                Username *
              </label>
            </FloatLabel>
          </div>

          {/* Password */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <Password
                id="password"
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                feedback={false}
                required
                className="w-full"
              />
              <label htmlFor="password" className="text-gray-700 font-semibold text-xs">
                Password *
              </label>
            </FloatLabel>
          </div>

          {/* Confirm Password */}
          <div className={floatLabelWrapperClass}>
            <FloatLabel>
              <Password
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                feedback={false}
                required
                className="w-full"
              />
              <label htmlFor="confirmPassword" className="text-gray-700 font-semibold text-xs">
                Confirm Password *
              </label>
            </FloatLabel>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              label={loading ? 'Registering...' : 'Register'}
              icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-user-plus'}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
