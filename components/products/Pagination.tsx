import { Button } from "@/components/ui/button";

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (newPage: number) => void;
    onLimitChange: (newLimit: string) => void;
}

export function Pagination({ page, limit, total, onPageChange, onLimitChange }: PaginationProps) {
    const showingStart = total === 0 ? 0 : (page - 1) * limit + 1;
    const showingEnd = Math.min(page * limit, total);

    return (
        <div className="p-4 border-t border-slate-200 bg-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{showingStart}–{showingEnd}</span> of <span className="font-semibold text-slate-900">{total}</span>
            </p>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Per page:</span>
                    <select
                        value={limit}
                        onChange={(e) => onLimitChange(e.target.value)}
                        className="bg-transparent border border-slate-200 rounded-md text-sm px-2 py-1 outline-none cursor-pointer"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button
                        className="py-2 px-3 w-auto text-sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        className="py-2 px-3 w-auto text-sm"
                        disabled={page * limit >= total}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}