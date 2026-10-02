// Загруженные файлы backend раздаёт с корня (/uploads/..., /upload_files/...),
// а не из-под /v1, поэтому убираем /v1 из VITE_SITE_URL.
// "https://api.nsumt.uz/v1" -> "https://api.nsumt.uz", "/v1" -> "".
const FILE_BASE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/v1\/?$/, "");

export const mediaUrl = (path) => `${FILE_BASE_URL}/${path}`;
