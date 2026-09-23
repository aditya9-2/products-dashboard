import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "flex min-h-30 w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl outline-none transition-all shadow-sm",
                    "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    "placeholder:text-slate-400 text-slate-900 resize-y",
                    className
                )}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";
export { Textarea };