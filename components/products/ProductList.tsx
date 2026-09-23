import { useRouter } from "next/navigation";
import { Product } from "@/types/products";
import { Package, Tag, IndianRupee, Star, Box } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ProductList({ products }: { products: Product[] }) {
    const router = useRouter();

    return (
        <>
            <div className="hidden md:block w-full min-w-175">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
                        <tr className="text-slate-500 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold whitespace-nowrap"><Package className="w-3.5 h-3.5 inline mr-1.5" /> Product</th>
                            <th className="p-4 font-semibold whitespace-nowrap"><Tag className="w-3.5 h-3.5 inline mr-1.5" /> Category</th>
                            <th className="p-4 font-semibold whitespace-nowrap"><IndianRupee className="w-3.5 h-3.5 inline mr-1.5" /> Price</th>
                            <th className="p-4 font-semibold whitespace-nowrap"><Star className="w-3.5 h-3.5 inline mr-1.5" /> Rating</th>
                            <th className="p-4 font-semibold whitespace-nowrap"><Box className="w-3.5 h-3.5 inline mr-1.5" /> Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((p) => (
                            <tr key={p.id} className="glass-panel-hover hover:bg-white/80 cursor-pointer transition-colors" onClick={() => router.push(`/products/${p.id}`)}>
                                <td className="p-4 flex items-center gap-4">
                                    <img src={p.thumbnail} alt={p.title} className="w-12 h-12 rounded-lg object-cover bg-white shadow-sm border border-slate-100" />
                                    <span className="font-medium text-slate-900">{p.title}</span>
                                </td>
                                <td className="p-4 text-slate-600 capitalize">{p.category.replace("-", " ")}</td>
                                <td className="p-4 text-slate-900 font-medium">{formatCurrency(p.price)}</td>
                                <td className="p-4 text-slate-600 flex items-center gap-1">
                                    {p.rating} <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                </td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${p.stock < 10 ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                                        {p.stock} in stock
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden flex flex-col gap-3 p-4">
                {products.map((p) => (
                    <div key={p.id} onClick={() => router.push(`/products/${p.id}`)} className="glass-panel glass-panel-hover p-4 rounded-2xl flex gap-4 cursor-pointer">
                        <img src={p.thumbnail} alt={p.title} className="w-20 h-20 rounded-xl object-cover bg-white border border-slate-100 shrink-0" />
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm leading-tight">{p.title}</h3>
                                <p className="text-xs text-slate-500 capitalize mt-1 flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {p.category.replace("-", " ")}
                                </p>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                                <span className="font-bold text-slate-900">{formatCurrency(p.price)}</span>
                                <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                                    {p.rating} <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}