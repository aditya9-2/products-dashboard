export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
};

export interface ProductFormData {
    title: string;
    price: number;
    stock: number;
    category: string;
    description: string;
    thumbnail?: string;
}

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