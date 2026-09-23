"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/products/ProductForm";
import { getCategories, addProduct } from "@/services/productService";
import { ProductFormData } from "@/types/products";
import { saveLocalAddedProduct } from "@/lib/localState";

export default function AddProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<{ slug: string, name: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        getCategories().then((data) => {
            if (isMounted) setCategories(data);
        });
        return () => { isMounted = false; };
    }, []);

    const handleSubmit = async (formData: ProductFormData) => {
        setIsSubmitting(true);
        try {
            // 1. Send to DummyJSON
            const newProduct = await addProduct(formData);

            // 2. Save the API response to our Local Overrides Manager
            saveLocalAddedProduct(newProduct);

            // 3. Redirect back to list
            router.push("/products");
        } catch (error) {
            console.error("Failed to add product", error);
            alert("Failed to add product. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full overflow-y-auto p-4 md:p-6 w-full">
            <div className="max-w-3xl mx-auto space-y-6">

                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/80">
                    <Button
                        onClick={() => router.back()}
                        className="w-auto px-4 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <h1 className="text-xl font-bold text-slate-900">Add New Product</h1>
                </div>

                <ProductForm
                    categories={categories}
                    onSubmit={handleSubmit}
                    isLoading={isSubmitting}
                />
            </div>
        </div>
    );
}