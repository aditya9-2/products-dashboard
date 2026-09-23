"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Loader2, AlertCircle, RefreshCw, Package } from "lucide-react";

import { getProducts, getCategories } from "@/services/productService";
import { useDebounce } from "@/hooks/useDebounce";
import { Product } from "@/types/products";

import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductList } from "@/components/products/ProductList";
import { Pagination } from "@/components/products/Pagination";

function ProductsView() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const urlPage = parseInt(searchParams.get("page") || "1");
    const page = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;
    const urlLimit = parseInt(searchParams.get("limit") || "10");
    const limit = [10, 20, 50].includes(urlLimit) ? urlLimit : 10;

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "";
    const order = (searchParams.get("order") as "asc" | "desc") || "asc";

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ slug: string, name: string }[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebounce(searchInput, 500);

    const updateURL = useCallback((newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === "") params.delete(key);
            else params.set(key, value);
        });
        router.push(`${pathname}?${params.toString()}`);
    }, [pathname, router, searchParams]);

    useEffect(() => {
        if (debouncedSearch !== search) {
            updateURL({ search: debouncedSearch, page: "1", category: null });
        }
    }, [debouncedSearch, search, updateURL]);

    useEffect(() => {
        let isMounted = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- resets loading/error state per fetch, not a cascading update
        setIsLoading(true);
        setError("");

        const fetchData = async () => {
            try {
                if (categories.length === 0) {
                    const cats = await getCategories();
                    if (isMounted) setCategories(cats);
                }
                const skip = (page - 1) * limit;
                const data = await getProducts({ limit, skip, search, category, sortBy, order });

                if (isMounted) {
                    setProducts(data.products);
                    setTotal(data.total);
                    setIsLoading(false);
                }
            } catch {
                if (isMounted) {
                    setError("Failed to load products. Please try again.");
                    setIsLoading(false);
                }
            }
        };

        fetchData();
        return () => { isMounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- categories.length intentionally excluded to avoid refetch loop
    }, [page, limit, search, category, sortBy, order]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchInput("");
        updateURL({ category: e.target.value, search: null, page: "1" });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [newSortBy, newOrder] = e.target.value.split("-");
        updateURL({ sortBy: newSortBy || null, order: newOrder || null, page: "1" });
    };

    return (
        <div className="h-full flex flex-col p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6 w-full">

            <div className="shrink-0">
                <ProductFilters
                    searchInput={searchInput}
                    onSearchChange={setSearchInput}
                    category={category}
                    categories={categories}
                    onCategoryChange={handleCategoryChange}
                    sortBy={sortBy}
                    order={order}
                    onSortChange={handleSortChange}
                />
            </div>

            <div className="glass-panel rounded-3xl flex flex-col flex-1 min-h-0 relative overflow-hidden">

                {isLoading && (
                    <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-800" />
                    </div>
                )}

                {error && !isLoading && (
                    <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                        <p className="text-slate-700 font-medium mb-4">{error}</p>
                        <Button className="w-auto px-6" onClick={() => updateURL({ page: page.toString() })}>
                            <RefreshCw className="w-4 h-4 mr-2" /> Retry
                        </Button>
                    </div>
                )}

                {!isLoading && !error && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200">
                            <Package className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="font-medium text-slate-900 mb-1">No products found</p>
                        <p className="text-sm text-slate-500">Try adjusting your search or filters.</p>
                        <Button className="w-auto px-6 mt-6" onClick={() => { setSearchInput(""); updateURL({ search: null, category: null, page: "1" }) }}>
                            Clear Filters
                        </Button>
                    </div>
                )}

                {!error && products.length > 0 && (
                    <>

                        <div className="flex-1 overflow-auto w-full relative">
                            <ProductList products={products} />
                        </div>

                        <div className="shrink-0 w-full z-10">
                            <Pagination
                                page={page}
                                limit={limit}
                                total={total}
                                onPageChange={(p) => updateURL({ page: p.toString() })}
                                onLimitChange={(l) => updateURL({ limit: l, page: "1" })}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-slate-800" />
            </div>
        }>
            <ProductsView />
        </Suspense>
    );
}