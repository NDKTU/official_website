import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";

import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {DeleteCarousel, GetCarouselsPaged} from "../../Api/CarouselApi.jsx";
import {usePagedQuery} from "../../hooks/usePagedQuery.jsx";
import Pagination from "../../components/Pagination.jsx";
import {mediaUrl} from "../../Api/mediaUrl.js";

function ListCarousel() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const {data, refetch, page, pageCount, total, offset, setPage} = usePagedQuery("list-carousel", GetCarouselsPaged);

    const carouselMutation = useMutation({
        mutationKey: ["carousel-delete"],
        mutationFn: DeleteCarousel,
        onSuccess: (data) => {
            toast.success(data.message || "Karusel muvaffaqiyatli o'chirildi");
            setIsModalOpen(null);
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });

    const handleDeleteClick = (carouselId) => {
        setIsModalOpen(carouselId); // Modalni ochish
    };

    const deleteHandler = async (carouselId) => {
        carouselMutation
            .mutateAsync(carouselId)
            .then(() => {
                refetch();
            })
            .catch((e) => console.log(e));
    };
    const cancelDelete = () => {
        setIsModalOpen(null); // Modalni bekor qilish
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Karusel</h2>
                <Link to="/create-carousel" className="btn btn-primary">
                    Karusel qo'shish
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-4">
                    <table className="w-full">
                        <thead>
                        <tr className="text-left bg-gray-50">
                            <th className="p-3 text-gray-600">N</th>
                            <th className="p-3 text-gray-600"> Rasm</th>
                            <th className="p-3 text-gray-600"> Sarlavha</th>
                            <th className="p-3 text-gray-600"> Tartib</th>
                            <th className="p-3 text-gray-600 flex justify-center ">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((slide, index) => {
                            return (
                                <tr className="border-t" key={slide?.carousel_id}>
                                    <td className="p-3 ">{offset + index + 1}</td>
                                    <td className="p-3 ">
                                        {slide?.photo && (
                                            <img
                                                src={mediaUrl(slide.photo)}
                                                alt=""
                                                className="h-12 w-20 rounded object-cover"
                                            />
                                        )}
                                    </td>
                                    <td className="p-3 ">{slide?.title_uz}</td>
                                    <td className="p-3 ">{slide?.order}</td>


                                    <td className="p-3">
                                        <div className="flex justify-center">
                                            <Link
                                                className=" flex items-center justify-start   pr-8"
                                                to={`/update-carousel/${slide?.carousel_id}`}
                                            >
                                                <button>
                                                    <FaRegEdit className="text-2xl text-[#3697A5]"/>
                                                </button>
                                            </Link>
                                            <button
                                                className="flex items-center justify-start  "
                                                onClick={() => handleDeleteClick(slide?.carousel_id)}
                                            >
                                                <MdDelete className="text-2xl text-red-600"/>
                                            </button>
                                            {isModalOpen === slide?.carousel_id && (
                                                <div
                                                    className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
                                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                                        <h2 className="text-lg font-semibold mb-4">
                                                            Haqiqatan ham o‘chirmoqchimisiz?
                                                        </h2>
                                                        <p className="mb-6">
                                <span className="text-red-600">
                                  {slide?.title_uz || "Bu element"}
                                </span>{" "}
                                                            ni o‘chirishni tasdiqlaysizmi?
                                                        </p>
                                                        <div className="flex justify-end gap-4">
                                                            <button
                                                                className="px-4 py-2 bg-gray-300 rounded "
                                                                onClick={cancelDelete}
                                                            >
                                                                Bekor qilish
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                                onClick={() => deleteHandler(slide?.carousel_id)}
                                                            >
                                                                O‘chirish
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <Pagination page={page} pageCount={pageCount} total={total} onChange={setPage}/>
            </div>
        </div>
    );
}

export default ListCarousel;
