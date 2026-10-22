import React from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {CreateCarouselApi} from "../../Api/CarouselApi.jsx";
import CarouselForm from "./CarouselForm.jsx";

function CreateCarousel() {
    const navigate = useNavigate();
    const carouselMutation = useMutation({
        mutationKey: ["create-carousel"],
        mutationFn: CreateCarouselApi,
        onSuccess: (data) => {
            toast.success(data.message || "Karusel muvaffaqiyatli yaratildi");
            navigate("/list-carousel");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });

    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Karusel qo'shish</h2>
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b bg-gray-50  ">
                <CarouselForm onSubmit={carouselMutation.mutate} submitLabel="Qo'shish"/>
            </div>
        </div>
    </div>);
}

export default CreateCarousel;
