import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormData } from "@/types/products";

interface ProductFormProps {
    initialData?: ProductFormData;
    categories: { slug: string; name: string }[];
    onSubmit: (data: ProductFormData) => Promise<void>;
    isLoading: boolean;
}

export function ProductForm({ initialData, categories, onSubmit, isLoading }: ProductFormProps) {

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        price: initialData?.price?.toString() || "",
        stock: initialData?.stock?.toString() || "",
        category: initialData?.category || "",
        description: initialData?.description || "",
        thumbnail: initialData?.thumbnail || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value // Save purely as string while typing
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Cast the string states back to strict numbers right before submitting to the API
        await onSubmit({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-6 md:p-8 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                        id="title" name="title" required
                        value={formData.title} onChange={handleChange}
                        placeholder="e.g. iPhone 15 Pro"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Price (INR) *</Label>
                    <Input
                        id="price" name="price" type="number" step="0.01" min="0" required
                        value={formData.price} onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                        id="stock" name="stock" type="number" min="0" required
                        value={formData.stock} onChange={handleChange}
                        placeholder="0"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                        id="category" name="category" required
                        value={formData.category} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20 cursor-pointer text-slate-700"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="thumbnail">Image URL (Optional)</Label>
                    <Input
                        id="thumbnail" name="thumbnail" type="url"
                        value={formData.thumbnail} onChange={handleChange}
                        placeholder="https://example.com/image.png"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                        id="description" name="description" required
                        value={formData.description} onChange={handleChange}
                        placeholder="Describe the product..."
                    />
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isLoading} className="w-auto px-8">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                    {initialData ? "Save Changes" : "Create Product"}
                </Button>
            </div>
        </form>
    );
}