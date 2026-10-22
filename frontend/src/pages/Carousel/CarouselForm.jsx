import React, {useMemo, useRef} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import FieldError from "../../components/FieldError.jsx";
import {submitWithErrors} from "../../utils/formErrors.js";
import {mediaUrl} from "../../Api/mediaUrl.js";

const API_URL = import.meta.env.VITE_API_URL;

const LANGS = [
    {code: "uz", label: "o'zbekcha"},
    {code: "ru", label: "ruscha"},
    {code: "en", label: "inglizcha"},
];

const inputClass =
    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const required = Yup.string().trim().required("!!! To'ldirish shart");

// Create va Update sahifalari uchun umumiy forma
function CarouselForm({carousel, onSubmit, submitLabel}) {
    const editorRef = useRef(null);
    const formik = useFormik({
        initialValues: {
            title_uz: carousel?.title_uz || "",
            title_ru: carousel?.title_ru || "",
            title_en: carousel?.title_en || "",
            subtitle_uz: carousel?.subtitle_uz || "",
            subtitle_ru: carousel?.subtitle_ru || "",
            subtitle_en: carousel?.subtitle_en || "",
            description_uz: carousel?.description_uz || "",
            description_ru: carousel?.description_ru || "",
            description_en: carousel?.description_en || "",
            text_uz: carousel?.text_uz || "",
            text_ru: carousel?.text_ru || "",
            text_en: carousel?.text_en || "",
            link: carousel?.link || "",
            order: carousel?.order ?? "",
            photo: null,
        },
        enableReinitialize: true,//update qilishda qayta render qiladi 1 ta kechmasligi uchun
        validationSchema: Yup.object({
            title_uz: required,
            title_ru: required,
            title_en: required,
            subtitle_uz: required,
            subtitle_ru: required,
            subtitle_en: required,
            description_uz: required,
            description_ru: required,
            description_en: required,
            // bo'sh qoldirilsa, backend ro'yxat oxiriga qo'yadi
            order: Yup.number()
                .typeError("!!! Butun son kiriting")
                .integer("!!! Butun son kiriting")
                .min(0, "!!! Manfiy bo'lmasin"),
        }),
        onSubmit: (values) => {
            onSubmit({
                ...values,
                link: values.link.trim(),
                order: values.order === "" ? null : Number(values.order),
            });
        },
    });

    const config = useMemo(() => ({
        readonly: false,
        height: 300,
        toolbarButtonSize: "middle",
        style: {
            table: {
                border: '1px solid #ccc',
                'border-collapse': 'collapse'
            },
            'td, th': {
                border: '1px solid #ccc',
                padding: '5px'
            }
        },
        uploader: {
            url: `${API_URL}/upload`,
            insertImageAsBase64URI: false,
            imagesExtensions: ["jpg", "png", "jpeg", "gif"],
            method: "POST",
            format: "json",
            prepareData: function (formData) {
                const file = formData.get("files[0]");
                formData.delete("files[0]");            // eski nomni o‘chirib tashlaymiz
                formData.append("upload_file", file);   // backend kutayotgan nom
                return formData;
                // const formData = new FormData();
                // const file = data.files[0];
                // if (file) {
                //     formData.append("upload_file", file);
                // } else {
                //     console.error("Fayl yo‘q yoki noto‘g‘ri format!");
                // }
                // return formData;
            },
            headers: {},
            isSuccess: function (resp) {
                return resp.file_url !== undefined;
            },
            process: function (resp) {
                if (resp.file_url) {
                    return {
                        files: [resp.file_url],
                    };
                }
                return {
                    files: [],
                };
            },
            defaultHandlerSuccess: function (data) {
                if (data.files && data.files[0]) {
                    const fileUrl = data.files[0]; // Fayl URL manzili
                    let htmlContent = '';

                    // Fayl turini aniqlash uchun URL oxirgi qismini tekshirish
                    const fileExtension = fileUrl.split('.').pop().toLowerCase();

                    switch (fileExtension) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                            // Rasm fayllari uchun
                            htmlContent = `<img src="${fileUrl}" alt="Yuklangan rasm" style="max-width: 100%;">`;
                            break;

                        case 'pdf':
                            htmlContent = `<a href="${fileUrl}" target="_blank" 
                            class="text-blue-600 cursor-pointer"> pdf </a>`;

                            break;

                        case 'doc':
                        case 'docx':
                            // Word fayllari uchun havola
                            htmlContent = `<a href="${fileUrl}" target="_blank">Word faylni yuklab olish</a>`;
                            break;

                        case 'xls':
                        case 'xlsx':
                            // Excel fayllari uchun havola
                            htmlContent = `<a href="${fileUrl}" target="_blank">Excel faylni yuklab olish</a>`;
                            break;

                        default:
                            // Noma'lum fayl turlari uchun umumiy havola
                            htmlContent = `<a href="${fileUrl}" target="_blank">Faylni yuklab olish</a>`;
                            break;
                    }

                    this.s.insertHTML(htmlContent); // Mavjud kontentga qo‘shish
                }


            },
        },

    }), []);

    return (
        <form
            onSubmit={submitWithErrors(formik)}
            className="grid grid-cols-1 gap-3"
        >
            {LANGS.map(({code, label}) => (
                <div className="w-full" key={`title_${code}`}>
                    <label htmlFor={`title_${code}`} className={labelClass}>
                        Sarlavha {label}
                    </label>
                    <FieldError formik={formik} name={`title_${code}`}/>
                    <input type="text"
                           id={`title_${code}`}
                           {...formik.getFieldProps(`title_${code}`)}
                           className={inputClass}/>
                </div>
            ))}
            {LANGS.map(({code, label}) => (
                <div className="w-full" key={`subtitle_${code}`}>
                    <label htmlFor={`subtitle_${code}`} className={labelClass}>
                        Sarlavha ustidagi qisqa yozuv {label}
                    </label>
                    <FieldError formik={formik} name={`subtitle_${code}`}/>
                    <input type="text"
                           id={`subtitle_${code}`}
                           {...formik.getFieldProps(`subtitle_${code}`)}
                           className={inputClass}/>
                </div>
            ))}
            {LANGS.map(({code, label}) => (
                <div className="w-full" key={`description_${code}`}>
                    <label htmlFor={`description_${code}`} className={labelClass}>
                        Karuseldagi qisqa tavsif {label}
                    </label>
                    <FieldError formik={formik} name={`description_${code}`}/>
                    <textarea
                        id={`description_${code}`}
                        rows={3}
                        {...formik.getFieldProps(`description_${code}`)}
                        className={inputClass}/>
                </div>
            ))}
            {LANGS.map(({code, label}) => (
                <div className="w-full" key={`text_${code}`}>
                    <label htmlFor={`text_${code}`} className="text-xl mb-2 mt-7">
                        Batafsil ma'lumot {label}
                    </label>
                    <JoditEditor
                        ref={editorRef}
                        config={config}
                        value={formik.values[`text_${code}`]}
                        onChange={(value) => {
                            formik.setFieldValue(`text_${code}`, value);
                        }}
                    />
                </div>
            ))}
            <div className="w-full">
                <label htmlFor="link" className={labelClass}>
                    Tashqi havola (ixtiyoriy)
                </label>
                <input type="text"
                       id="link"
                       placeholder="https://..."
                       {...formik.getFieldProps("link")}
                       className={inputClass}/>
                <p className="mt-1 text-sm text-gray-500">
                    To'ldirilsa, "Batafsil" tugmasi batafsil ma'lumot sahifasi o'rniga shu havolani ochadi.
                </p>
            </div>
            <div className="w-full">
                <label htmlFor="order" className={labelClass}>
                    Tartib raqami
                </label>
                <FieldError formik={formik} name="order"/>
                <input type="number"
                       id="order"
                       min="0"
                       placeholder="Bo'sh qoldirilsa, oxiriga qo'shiladi"
                       {...formik.getFieldProps("order")}
                       className={inputClass}/>
            </div>
            <div className="w-full">
                <label className={labelClass} htmlFor="photo">
                    Karusel fon rasmini yuklash
                </label>
                {carousel?.photo && (
                    <img
                        src={mediaUrl(carousel.photo)}
                        alt=""
                        className="mb-2 h-32 rounded-lg object-cover"
                    />
                )}
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        formik.setFieldValue("photo", event.currentTarget.files[0]);
                    }}
                />
                <p className="mt-1 text-sm text-gray-500">
                    Rasm yuklanmasa, saytdagi standart fon (universitet binosi) ko'rsatiladi.
                </p>
            </div>
            <button type="submit"
                    className="focus:outline-none w-full text-white bg-[#3697A5] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                {submitLabel}
            </button>
        </form>
    );
}

export default CarouselForm;
