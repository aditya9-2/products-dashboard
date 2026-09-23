import { Product } from "@/types/products";

const getAdded = (): Product[] => JSON.parse(localStorage.getItem("volt_added") || "[]");
const getEdited = (): Record<string, any> => JSON.parse(localStorage.getItem("volt_edited") || "{}");
const getDeleted = (): number[] => JSON.parse(localStorage.getItem("volt_deleted") || "[]");

export const saveLocalAddedProduct = (product: any) => {
    const added = getAdded();

    const uniqueId = Date.now();

    const newProduct = {
        ...product,
        id: uniqueId,
        thumbnail: product.thumbnail || "https://dummyjson.com/image/150",
        images: product.images || ["https://dummyjson.com/image/150"],
        rating: product.rating || 5.0,
    };

    localStorage.setItem("volt_added", JSON.stringify([newProduct, ...added]));
};

export const saveLocalEditedProduct = (id: number, data: any) => {
    const edited = getEdited();
    edited[id] = { ...edited[id], ...data };
    localStorage.setItem("volt_edited", JSON.stringify(edited));
};

export const saveLocalDeletedProduct = (id: number) => {
    const deleted = getDeleted();
    if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem("volt_deleted", JSON.stringify(deleted));
    }
};

export const applyLocalMutationsToList = (apiProducts: Product[]): Product[] => {
    if (typeof window === "undefined") return apiProducts;

    const added = getAdded();
    const edited = getEdited();
    const deleted = getDeleted();

    // Remove deleted items
    let merged = apiProducts.filter((p) => !deleted.includes(p.id));

    // Overwrite with edited items
    merged = merged.map((p) => (edited[p.id] ? { ...p, ...edited[p.id] } : p));

    const apiIds = new Set(merged.map((p) => p.id));
    const newItems = added.filter((p) => !apiIds.has(p.id));

    return [...newItems, ...merged];
};

export const applyLocalMutationsToSingle = (apiProduct: any) => {
    if (typeof window === "undefined") return apiProduct;

    const edited = getEdited();
    if (edited[apiProduct.id]) {
        return { ...apiProduct, ...edited[apiProduct.id] };
    }
    return apiProduct;
};