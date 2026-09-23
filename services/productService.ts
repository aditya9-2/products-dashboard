import { apiClient } from "@/lib/axios";
import { ProductFormData } from "@/types/products";
import { applyLocalMutationsToList, applyLocalMutationsToSingle, getLocalAddedProducts } from "@/lib/localState";

export interface GetProductsParams {
    limit?: number;
    skip?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc" | "";
}

export const getProducts = async ({
    limit = 10,
    skip = 0,
    search = "",
    category = "",
    sortBy = "",
    order = "asc"
}: GetProductsParams) => {
    let url = "/products";

    if (category) {
        url = `/products/category/${category}`;
    } else if (search) {
        url = `/products/search`;
    }

    const params: Record<string, any> = { limit, skip };

    if (search && !category) {
        params.q = search;
    }
    if (sortBy) {
        params.sortBy = sortBy;
        params.order = order;
    }

    const response = await apiClient.get(url, { params });

    response.data.products = applyLocalMutationsToList(response.data.products);

    const localAddedCount = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("volt_added") || "[]").length : 0;
    const localDeletedCount = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("volt_deleted") || "[]").length : 0;
    response.data.total = response.data.total + localAddedCount - localDeletedCount;

    return response.data;
};

export const getCategories = async () => {
    const response = await apiClient.get("/products/categories");
    return response.data;
};


export const getProductById = async (id: string) => {

    if (typeof window !== "undefined") {
        const localProd = getLocalAddedProducts().find((p: any) => p.id.toString() === id.toString());
        if (localProd) return applyLocalMutationsToSingle(localProd);
    }

    try {
        const response = await apiClient.get(`/products/${id}`);
        return applyLocalMutationsToSingle(response.data);
    } catch (err: any) {
        if (err.response?.status === 404 && typeof window !== "undefined") {
            const localProd = getLocalAddedProducts().find((p: any) => p.id.toString() === id.toString());
            if (localProd) return localProd;
        }
        throw err;
    }
};

export const addProduct = async (data: ProductFormData) => {
    const response = await apiClient.post("/products/add", data);
    return response.data;
};

export const editProduct = async (id: string | number, data: Partial<ProductFormData>) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: string | number) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
};