import * as React from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
           
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity cursor-pointer"
                onClick={onClose}
            ></div>

            {/* Dialog Panel */}
            <div className="relative bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-2xl w-full max-w-md p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}