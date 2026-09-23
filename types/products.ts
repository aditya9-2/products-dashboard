export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku: string;
    weight: number;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    thumbnail: string;
    images: string[];
}

export interface PaginatedProducts {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}

export interface ProductQueryParams {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    category?: string;
}