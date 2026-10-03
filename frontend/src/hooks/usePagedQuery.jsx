import {useEffect, useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {PAGE_LIMIT} from "../Api/pagination.jsx";

export function usePagedQuery(key, fetchPage) {
    const [page, setPage] = useState(1);
    const query = useQuery({
        queryKey: [key, page],
        queryFn: () => fetchPage(page),
        placeholderData: keepPreviousData,
    });

    const total = query.data?.total ?? 0;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_LIMIT));

    // Oxirgi sahifadagi so'nggi element o'chirilsa, oldingi sahifaga qaytamiz
    useEffect(() => {
        if (query.data && page > pageCount) setPage(pageCount);
    }, [query.data, page, pageCount]);

    return {
        ...query,
        data: query.data?.items,
        total,
        page,
        pageCount,
        setPage,
        offset: (page - 1) * PAGE_LIMIT,
    };
}
