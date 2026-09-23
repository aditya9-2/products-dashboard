import { useRouter } from "next/navigation";
import { Search, Filter, ArrowUpDown, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
    searchInput: string;
    onSearchChange: (val: string) => void;
    category: string;
    categories: { slug: string; name: string }[];
    onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    sortBy: string;
    order: string;
    onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function ProductFilters({
    searchInput,
    onSearchChange,
    category,
    categories,
    onCategoryChange,
    sortBy,
    order,
    onSortChange
}: ProductFiltersProps) {
    const router = useRouter();

    return (

        <div className="glass-panel p-6 rounded-3xl flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                <p className="text-sm text-slate-500">Manage your catalog inventory</p>
            </div>

            <div className="flex flex-col md:flex-row w-full xl:w-auto gap-3 flex-wrap xl:flex-nowrap">
                <div className="relative w-full md:w-56 xl:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 bg-white/80"
                        value={searchInput}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="relative flex-1 md:flex-none">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                        value={category}
                        onChange={onCategoryChange}
                        className="w-full appearance-none pl-9 pr-8 py-3 bg-white/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="relative flex-1 md:flex-none">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                        value={sortBy ? `${sortBy}-${order}` : ""}
                        onChange={onSortChange}
                        className="w-full appearance-none pl-9 pr-8 py-3 bg-white/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                        <option value="">Sort by: Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Rating: Highest</option>
                        <option value="title-asc">Title: A-Z</option>
                    </select>
                </div>

                <Button
                    onClick={() => router.push("/products/add")}
                    className="w-full md:w-auto px-5 bg-slate-900 hover:bg-slate-800 text-white shadow-sm shrink-0"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
            </div>
        </div>
    );
}