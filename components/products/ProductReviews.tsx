import { Star } from "lucide-react";
import { Review } from "@/types/products";

export function ProductReviews({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-3xl mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review, idx) => (
                    <div key={idx} className="bg-white/60 p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-slate-900">{review.reviewerName}</span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">"{review.comment}"</p>
                        <span className="text-xs text-slate-400 font-medium">
                            {new Date(review.date).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}