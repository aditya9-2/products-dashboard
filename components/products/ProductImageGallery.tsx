import { useState } from "react";

interface ProductImageGalleryProps {
    images: string[];
    thumbnail: string;
    title: string;
}

export function ProductImageGallery({ images, thumbnail, title }: ProductImageGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0] || thumbnail);

    return (
        <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4">
            <div className="aspect-square rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
                <img src={activeImage} alt={title} className="w-full h-full object-contain" />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-blue-500 shadow-md' : 'border-transparent bg-white shadow-sm'}`}
                        >
                            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}