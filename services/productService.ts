import { apiClient } from "@/lib/axios";

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
    return response.data;
};

export const getCategories = async () => {
    const response = await apiClient.get("/products/categories");
    return response.data;
};