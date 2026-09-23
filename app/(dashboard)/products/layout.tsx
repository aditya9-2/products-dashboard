"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            router.replace("/login");
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time auth check, no cascading render risk
            setIsAuthorized(true);
        }
    }, [router, pathname]);

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        router.replace("/login");
    };

    if (!isAuthorized) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-slate-800" />
            </div>
        );
    }

    return (

        <div className="h-screen flex flex-col relative bg-slate-50 overflow-hidden">

            <div className="fixed top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none z-0"></div>

            <header className="glass-panel shrink-0 z-50 border-b border-white/80">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
                            <Zap className="w-4 h-4 text-yellow-300" />
                        </div>
                        <span className="font-bold text-slate-900 tracking-tight">Volt Admin</span>
                    </div>

                    <Button
                        onClick={handleLogout}
                        className="w-auto px-4 py-2 h-9 text-sm bg-white/50 hover:bg-white text-slate-700 border border-slate-200"
                    >
                        <LogOut className="w-4 h-4 mr-2 text-slate-500" />
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content strictly takes up remaining space */}
            <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
}