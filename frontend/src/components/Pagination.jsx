import React from "react";

function pageList(page, pageCount) {
    const pages = new Set([1, pageCount, page - 1, page, page + 1]);
    return [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
}

function Pagination({page, pageCount, total, onChange}) {
    if (pageCount <= 1) return null;

    const base = "px-3 py-1 rounded border text-sm disabled:opacity-40 disabled:cursor-not-allowed";
    const pages = pageList(page, pageCount);

    return (
        <div className="flex items-center justify-between p-4 border-t">
            <span className="text-sm text-gray-600">Jami: {total}</span>
            <div className="flex items-center gap-1">
                <button className={base} disabled={page === 1} onClick={() => onChange(page - 1)}>
                    Oldingi
                </button>
                {pages.map((p, i) => (
                    <React.Fragment key={p}>
                        {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-gray-400">…</span>}
                        <button
                            className={`${base} ${p === page ? "bg-[#3697A5] text-white border-[#3697A5]" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                            onClick={() => onChange(p)}
                        >
                            {p}
                        </button>
                    </React.Fragment>
                ))}
                <button className={base} disabled={page === pageCount} onClick={() => onChange(page + 1)}>
                    Keyingi
                </button>
            </div>
        </div>
    );
}

export default Pagination;
