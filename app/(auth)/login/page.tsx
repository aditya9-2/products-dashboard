"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        setError("");

        try {
            const data = await loginUser(username, password);

            if (data.token) {
                localStorage.setItem("auth_token", data.token);
                router.push("/products");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Invalid credentials. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

            {/* Main Glass Panel */}
            <div className="relative w-full max-w-225 grid grid-cols-1 md:grid-cols-2 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden z-10">

                {/* Left Side Branding */}
                <div className="p-10 md:p-14 flex flex-col justify-center bg-white/30 border-r border-white/50 relative">
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl mb-8 shadow-sm">
                        V
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                        Catalog control,<br />
                        <span className="text-blue-600">precision first.</span>
                    </h1>

                    <p className="text-slate-600 text-sm leading-relaxed mb-12 font-medium">
                        Volt is a product admin for DummyJSON. Search, filter, and mutate the catalog with URL-faithful state and session-local writes.
                    </p>

                    <div className="mt-auto pt-8 border-t border-slate-200/50">
                    </div>
                </div>

                <div className="p-10 md:p-14 flex flex-col justify-center">
                    <div className="mb-8">
                        <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                            Sign In
                        </p>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Welcome back
                        </h2>
                        <p className="text-sm text-slate-500">
                            Authenticate against DummyJSON. Demo account is prefilled.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {error && (
                            <div className="p-3 bg-red-50/80 border border-red-100 rounded-xl text-red-600 text-sm text-center font-medium animate-in fade-in zoom-in duration-300">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" isLoading={isLoading}>
                                Enter dashboard
                            </Button>
                        </div>

                        <p className="text-xs text-center text-slate-500 mt-6">
                            Demo credentials: <span className="font-mono font-semibold text-slate-700">emilys</span> / <span className="font-mono font-semibold text-slate-700">emilyspass</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}