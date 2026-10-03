export const PAGE_LIMIT = 10;

// Jami soni backenddan X-Total-Count sarlavhasida keladi
export const getPaged = async (client, url, page, limit = PAGE_LIMIT) => {
    const response = await client.get(url, {params: {page, limit}});
    return {
        items: response.data,
        total: Number(response.headers["x-total-count"]) || 0,
    };
};
