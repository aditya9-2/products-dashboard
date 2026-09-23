"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";

import { getProductById, ProductDetails } from "@/services/productService";
import { Button } from "@/components/ui/button";

import { ProductNotFound } from "@/components/products/ProductNotFound";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductReviews } from "@/components/products/ProductReviews";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();

    const unwrappedParams = use(params);
    const productId = unwrappedParams.id;

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const fetchProduct = async () => {
            try {
                const data = await getProductById(productId);
                if (isMounted) {
                    setProduct(data);
                    setIsLoading(false);
                }
            } catch (err: any) {
                if (isMounted) {
                    if (err.response?.status === 404) {
                        setError("404");
                    } else {
                        setError("Failed to load product details.");
                    }
                    setIsLoading(false);
                }
            }
        };

        fetchProduct();
        return () => { isMounted = false; };
    }, [productId]);

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-800" />
            </div>
        );
    }

    if (error === "404" || (!product && !isLoading)) return <ProductNotFound />;

    if (error) {
        return (
            <div className="h-full flex items-center justify-center text-red-500 font-medium">
                {error}
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="h-full overflow-y-auto p-4 md:p-6 w-full">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/80">
                    <Button
                        onClick={() => router.back()}
                        className="w-auto px-4 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <div className="flex gap-2">
                        <Button className="w-auto px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 border border-blue-100 shadow-sm">
                            Edit Product
                        </Button>
                        <Button className="w-auto px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 shadow-sm">
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProductImageGallery images={product.images} thumbnail={product.thumbnail} title={product.title} />
                    <ProductInfo product={product} />
                </div>

                <ProductReviews reviews={product.reviews} />
            </div>
        </div>
    );
}