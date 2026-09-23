import { Product } from "@/types/products";

const getAdded = (): Product[] => JSON.parse(localStorage.getItem("volt_added") || "[]");
const getEdited = (): Record<string, any> => JSON.parse(localStorage.getItem("volt_edited") || "{}");
const getDeleted = (): number[] => JSON.parse(localStorage.getItem("volt_deleted") || "[]");

export const saveLocalAddedProduct = (product: any) => {
    const added = getAdded();

    const uniqueId = Date.now();

    const imageUrl = product.thumbnail || "https://dummyjson.com/image/150";

    const newProduct = {
        ...product,
        id: uniqueId,
        thumbnail: product.thumbnail || "https://dummyjson.com/image/150",
        images: [imageUrl],
        rating: product.rating || 5.0,
    };

    localStorage.setItem("volt_added", JSON.stringify([newProduct, ...added]));
};

export const saveLocalEditedProduct = (id: number, data: any) => {
    const edited = getEdited();
    const updatedData = { ...data };
    if (updatedData.thumbnail) {
        updatedData.images = [updatedData.thumbnail];
    }
    edited[id] = { ...edited[id], ...updatedData };
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

    let merged = apiProducts.filter((p) => !deleted.includes(p.id));
    merged = merged.map((p) => (edited[p.id] ? { ...p, ...edited[p.id] } : p));

    const apiIds = new Set(merged.map((p) => p.id));
    const newItems = added
        .filter((p) => !apiIds.has(p.id))
        .filter((p) => !deleted.includes(p.id));

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

export const isLocalOnlyProduct = (id: number | string): boolean => {
    if (typeof window === "undefined") return false;
    const added = getAdded();
    return added.some((p) => p.id.toString() === id.toString());
};

export const updateLocalAddedProduct = (id: number, data: any) => {
    const added = getAdded();
    const idx = added.findIndex((p) => p.id.toString() === id.toString());
    if (idx === -1) return false;

    const updated = { ...added[idx], ...data };
    if (data.thumbnail) {
        updated.thumbnail = data.thumbnail;
        updated.images = [data.thumbnail];
    }
    added[idx] = updated;
    localStorage.setItem("volt_added", JSON.stringify(added));
    return true;
};

export const getLocalAddedProducts = (): Product[] => getAdded();