"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const VALID_LIMITS = [10, 20, 50];

export function useProductFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = useMemo(() => {
        const raw = Number(searchParams.get("page"));
        return isNaN(raw) || raw < 1 ? 1 : Math.floor(raw);
    }, [searchParams]);

    const limit = useMemo(() => {
        const raw = Number(searchParams.get("limit"));
        return VALID_LIMITS.includes(raw) ? raw : 10;
    }, [searchParams]);

    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "";
    const order = (searchParams.get("order") as "asc" | "desc") || "asc";

    const setFilters = useCallback(
        (updates: Record<string, string | number | null | undefined>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            });

            if (!("page" in updates)) {
                params.set("page", "1");
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, router, searchParams]
    );

    return {
        page,
        limit,
        q,
        category,
        sortBy,
        order,
        skip: (page - 1) * limit,
        setFilters,
    };
}