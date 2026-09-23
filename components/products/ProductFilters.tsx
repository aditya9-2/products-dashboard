import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    return (
        <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                <p className="text-sm text-slate-500">Manage your catalog inventory</p>
            </div>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 bg-white/80"
                        value={searchInput}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                        value={category}
                        onChange={onCategoryChange}
                        className="w-full sm:w-auto appearance-none pl-9 pr-8 py-3 bg-white/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                        value={sortBy ? `${sortBy}-${order}` : ""}
                        onChange={onSortChange}
                        className="w-full sm:w-auto appearance-none pl-9 pr-8 py-3 bg-white/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                        <option value="">Sort by: Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Rating: Highest</option>
                        <option value="title-asc">Title: A-Z</option>
                    </select>
                </div>
            </div>
        </div>
    );
}