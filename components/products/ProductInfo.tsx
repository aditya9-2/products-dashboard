import { Star, Package, Tag } from "lucide-react";
import { ProductDetails } from "@/types/products";
import { formatCurrency } from "@/lib/utils";

export function ProductInfo({ product }: { product: ProductDetails }) {
    return (
        <div className="glass-panel p-6 rounded-3xl flex flex-col">
            <div className="mb-2 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.category.replace("-", " ")}
                </span>
                {product.brand && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {product.brand}
                    </span>
                )}
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{product.title}</h1>

            <div className="flex items-end gap-4 mb-6 pb-6 border-b border-slate-200">
                <span className="text-4xl font-black text-slate-900">{formatCurrency(product.price)}</span>
                <div className="flex items-center gap-1 mb-1 bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700 font-bold text-sm">
                    {product.rating} <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-white/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <Package className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">Stock</span>
                    <span className={`font-bold text-lg ${product.stock < 10 ? 'text-red-600' : 'text-slate-900'}`}>
                        {product.stock} units
                    </span>
                </div>
                <div className="bg-white/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <Tag className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">SKU</span>
                    <span className="font-bold text-lg text-slate-900">
                        {product.sku || 'N/A'}
                    </span>
                </div>
            </div>
        </div>
    );
}