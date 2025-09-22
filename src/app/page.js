"use client";
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Basic validation
            if (username === 'admin' && password === 'password') {
                alert('Login successful!');
                // Redirect to dashboard or home page
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex align-items-center justify-content-center min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="surface-card p-6 shadow-4 border-round w-full md:w-25rem">
                <div className="text-center mb-5">
                    <div className="mb-3">
                        <i className="pi pi-user text-6xl text-primary"></i>
                    </div>
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium">Sign in to your account</span>
                </div>

                {error && (
                    <Message severity="error" text={error} className="w-full mb-3" />
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-900 font-medium mb-2">
                            Username
                        </label>
                        <InputText 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            className="w-full" 
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-900 font-medium mb-2">
                            Password
                        </label>
                        <Password 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            toggleMask 
                            feedback={false} 
                            required 
                            className="w-full"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-900">Remember me</label>
                        </div>
                        <a href="#" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                            Forgot password?
                        </a>
                    </div>

                    <Button 
                        type="submit" 
                        label={loading ? "Signing in..." : "Sign In"} 
                        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"} 
                        className="w-full"
                        loading={loading}
                        disabled={!username || !password}
                    />
                </form>

                <div className="text-center mt-4">
                    <span className="text-600">Don't have an account? </span>
                    <a href="#" className="font-medium no-underline text-blue-500 cursor-pointer">
                        Create one
                    </a>
                </div>
            </div>
        </div>
    );
}