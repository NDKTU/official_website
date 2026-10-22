import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosInstance";
import {getPaged} from "./pagination.jsx";

const FIELDS = [
    "title_uz", "title_ru", "title_en",
    "subtitle_uz", "subtitle_ru", "subtitle_en",
    "description_uz", "description_ru", "description_en",
    "text_uz", "text_ru", "text_en",
    "link",
];

const toFormData = (carouselData) => {
    const formData = new FormData();
    FIELDS.forEach((field) => formData.append(field, carouselData[field] || ""));
    // bo'sh qoldirilsa, backend ro'yxat oxiriga qo'yadi
    if (carouselData.order !== null && carouselData.order !== undefined) {
        formData.append("order", carouselData.order);
    }
    if (carouselData.photo) {
        formData.append("photo", carouselData.photo);
    }
    return formData;
};

const multipart = {
    headers: {
        "Content-Type": "multipart/form-data", // Fayl yuborish uchun zarur sarlavha
    },
};

export const GetCarouselsPaged = (page) =>
    getPaged(axios, `${API_URL}/carousel/get_carousels`, page);

export const CreateCarouselApi = async (carouselData) => {
    const response = await axiosInstance.post(
        `${API_URL}/carousel/add_carousel`, toFormData(carouselData), multipart
    );
    return response.data;
};

export const DeleteCarousel = async (carouselId) => {
    const response = await axiosInstance.delete(
        `${API_URL}/carousel/delete_carousel/${carouselId}`
    );
    return response.data;
};

export const detailCarousel = async (carouselId) => {
    const response = await axios.get(`${API_URL}/carousel/carousel_detail/${carouselId}`);
    return response.data;
};

export const UpdateCarouselApi = async (carouselId, carouselData) => {
    const response = await axiosInstance.put(
        `${API_URL}/carousel/update_carousel/${carouselId}`, toFormData(carouselData), multipart
    );
    return response.data;
};
