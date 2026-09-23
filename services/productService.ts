import { apiClient } from "@/lib/axios";
import { Category, PaginatedProducts, Product, ProductQueryParams } from "@/types/products";

export const productService = {
    getProducts: async (
        params: ProductQueryParams,
        signal?: AbortSignal
    ): Promise<PaginatedProducts> => {
        const { limit = 10, skip = 0, q, category, sortBy, order } = params;

        let endpoint = "/products";

        // DummyJSON limitation handling:
        // 'q' takes precedence over 'category' because DummyJSON doesn't support dual filtering.
        if (q && q.trim() !== "") {
            endpoint = "/products/search";
        } else if (category && category !== "all") {
            endpoint = `/products/category/${encodeURIComponent(category)}`;
        }

        const { data } = await apiClient.get<PaginatedProducts>(endpoint, {
            signal,
            params: {
                limit,
                skip,
                ...(q ? { q: q.trim() } : {}),
                ...(sortBy ? { sortBy, order: order || "asc" } : {}),
            },
        });

        return data;
    },

    getCategories: async (): Promise<Category[]> => {
        const { data } = await apiClient.get<Category[]>("/products/categories");
        return data;
    },

    getProductById: async (id: string | number): Promise<Product> => {
        const { data } = await apiClient.get<Product>(`/products/${id}`);
        return data;
    },

    createProduct: async (productData: Partial<Product>): Promise<Product> => {
        const { data } = await apiClient.post<Product>("/products/add", productData);
        return data;
    },

    updateProduct: async (id: number, productData: Partial<Product>): Promise<Product> => {
        const { data } = await apiClient.put<Product>(`/products/${id}`, productData);
        return data;
    },

    deleteProduct: async (id: number): Promise<Product & { isDeleted: boolean }> => {
        const { data } = await apiClient.delete<Product & { isDeleted: boolean }>(`/products/${id}`);
        return data;
    },
};