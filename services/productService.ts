import { apiClient } from "@/lib/axios";
import { Product } from "@/types/products";

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

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
}

export interface ProductDetails extends Product {
    description: string;
    images: string[];
    reviews: Review[];
    brand?: string;
    sku?: string;
}


export const getProductById = async (id: string): Promise<ProductDetails> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
};


export const deleteProduct = async (id: string | number) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
};