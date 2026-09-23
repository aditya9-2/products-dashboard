"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/products/ProductForm";
import { getCategories, getProductById, editProduct } from "@/services/productService";
import { ProductFormData } from "@/types/products";
import { isLocalOnlyProduct, saveLocalEditedProduct, updateLocalAddedProduct } from "@/lib/localState";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const productId = unwrappedParams.id;

    const [categories, setCategories] = useState<{ slug: string, name: string }[]>([]);
    const [initialData, setInitialData] = useState<ProductFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchInitialData = async () => {
            try {
                const [catData, prodData] = await Promise.all([
                    getCategories(),
                    getProductById(productId)
                ]);

                if (isMounted) {
                    setCategories(catData);
                    setInitialData({
                        title: prodData.title,
                        price: prodData.price,
                        stock: prodData.stock,
                        category: prodData.category,
                        description: prodData.description,
                        thumbnail: prodData.thumbnail
                    });
                    setIsLoading(false);
                }
            } catch {
                if (isMounted) {
                    alert("Failed to load product data.");
                    router.push("/products");
                }
            }
        };

        fetchInitialData();
        return () => { isMounted = false; };
    }, [productId, router]);

    const handleSubmit = async (formData: ProductFormData) => {
        setIsSubmitting(true);
        try {
            if (isLocalOnlyProduct(productId)) {
                // Never existed on the server — don't call the API, just update our own record
                updateLocalAddedProduct(Number(productId), formData);
            } else {
                await editProduct(productId, formData);
                saveLocalEditedProduct(Number(productId), formData);
            }

            router.push(`/products/${productId}`);
        } catch (error) {
            console.error("Failed to edit product", error);
            alert("Failed to update product. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-800" />
            </div>
        );
    }

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
                    <h1 className="text-xl font-bold text-slate-900">Edit Product</h1>
                </div>

                {initialData && (
                    <ProductForm
                        initialData={initialData}
                        categories={categories}
                        onSubmit={handleSubmit}
                        isLoading={isSubmitting}
                    />
                )}
            </div>
        </div>
    );
}