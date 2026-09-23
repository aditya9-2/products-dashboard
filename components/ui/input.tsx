import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    "w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl outline-none transition-all shadow-sm",
                    "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    "placeholder:text-slate-400 text-slate-900",
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };