import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/productService";
import { isLocalOnlyProduct } from "@/lib/localState";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    productTitle: string;
    onSuccess: (id: number) => void;
}

export function DeleteProductModal({ isOpen, onClose, productId, productTitle, onSuccess }: DeleteProductModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        setIsDeleting(true);
        setError("");

        try {
            if (!isLocalOnlyProduct(productId)) {
                await deleteProduct(productId);
            }

            onSuccess(productId);
        } catch {
            setError("Failed to delete product. Please try again.");
            setIsDeleting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={!isDeleting ? onClose : () => { }} title="Confirm Deletion">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100 mb-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>

                <p className="text-slate-600">
                    Are you sure you want to delete <span className="font-bold text-slate-900">&quot;{productTitle}&quot;</span>?
                    This action cannot be undone.
                </p>

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <div className="flex gap-3 w-full mt-6">
                    <Button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-none"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
                    >
                        {isDeleting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}