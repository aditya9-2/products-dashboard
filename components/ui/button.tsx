import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex items-center justify-center w-full py-3.5 px-4 rounded-xl font-medium transition-all active:scale-[0.98]",
                    "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10",
                    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    children
                )}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };