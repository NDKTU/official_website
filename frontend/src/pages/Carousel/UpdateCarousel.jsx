import React from "react";
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {detailCarousel, UpdateCarouselApi} from "../../Api/CarouselApi.jsx";
import CarouselForm from "./CarouselForm.jsx";

function UpdateCarousel() {
    const {carouselId} = useParams();
    const navigate = useNavigate();

    const {data} = useQuery({
        queryKey: ["carousel-detail", carouselId],
        queryFn: () => detailCarousel(carouselId),
    });
    const carouselMutation = useMutation({
        mutationKey: ["update-carousel"],
        mutationFn: (carouselData) => UpdateCarouselApi(carouselId, carouselData),
        onSuccess: (data) => {
            toast.success(data.message || "Karusel muvaffaqiyatli o'zgartirildi");
            navigate("/list-carousel");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });

    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Karuselni o'zgartirish</h2>
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b bg-gray-50  ">
                <CarouselForm carousel={data} onSubmit={carouselMutation.mutate} submitLabel="O'zgartirish"/>
            </div>
        </div>
    </div>);
}

export default UpdateCarousel;
