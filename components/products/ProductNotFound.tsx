import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductNotFound() {
    const router = useRouter();

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Product Not Found</h1>
            <p className="text-slate-500 mb-8 max-w-md">The product you are looking for does not exist or has been removed.</p>
            <Button onClick={() => router.push("/products")} className="w-auto px-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
            </Button>
        </div>
    );
}