import toast from "react-hot-toast";

// Select'larda <label htmlFor> yo'q, shuning uchun nomi shu yerdan olinadi
const FALLBACK_LABELS = {
    facultyId: "Fakultet",
    departmentId: "Kafedra",
    categoryId: "Kategoriya",
    order: "Tartib raqami",
    photo: "Rasm",
    faculty_icon: "Fakultet ikonkasi",
};

const toCamel = (name) => name.replace(/_id$/, "Id");

const findLabel = (field) =>
    document.querySelector(`label[for="${field}"]`);

export const getFieldLabel = (field) => {
    const camel = toCamel(field);
    const label = findLabel(field) || findLabel(camel);
    return (
        label?.textContent.trim() ||
        FALLBACK_LABELS[field] ||
        FALLBACK_LABELS[camel] ||
        field
    );
};

const cleanMessage = (message) => String(message).replace(/^!+\s*/, "");

const showErrorList = (title, lines) =>
    toast.error([title, ...lines.map((line) => `• ${line}`)].join("\n"), {
        id: "form-errors",
        duration: 6000,
        style: {whiteSpace: "pre-line", textAlign: "left"},
    });

const scrollToField = (field) => {
    const target =
        findLabel(field) ||
        document.getElementById(field) ||
        document.querySelector(`[name="${field}"]`);
    target?.scrollIntoView({behavior: "smooth", block: "center"});
    document.getElementById(field)?.focus({preventScroll: true});
};

// <form onSubmit={submitWithErrors(formik)}> — validatsiyadan o'tmasa,
// jim qolmasdan qaysi maydonlar to'ldirilmaganini ko'rsatadi.
export const submitWithErrors = (formik) => async (event) => {
    event?.preventDefault();
    const errors = await formik.validateForm();
    const fields = Object.keys(errors);
    if (fields.length === 0) {
        formik.submitForm();
        return;
    }
    formik.setTouched(
        {...formik.touched, ...Object.fromEntries(fields.map((f) => [f, true]))},
        false,
    );
    showErrorList(
        "Saqlanmadi. Quyidagi maydonlarni to'ldiring:",
        fields.map((f) => `${getFieldLabel(f)} — ${cleanMessage(errors[f])}`),
    );
    scrollToField(fields[0]);
};

const VALIDATION_MESSAGES = {
    missing: "To'ldirish shart",
    string_type: "Matn kiriting",
    int_parsing: "Butun son kiriting",
    int_type: "Butun son kiriting",
};

// Backend (FastAPI) xatosini o'qiladigan matnga aylantiradi.
// 422 da `detail` massiv bo'lib keladi: [{loc: ["body", "name_uz"], type: "missing", msg}]
export const getApiErrorMessage = (error, fallback = "Xatolik yuz berdi") => {
    if (!error?.response) {
        return error?.request ? "Server bilan bog'lanib bo'lmadi" : error?.message || fallback;
    }
    const data = error.response.data;
    if (typeof data?.message === "string" && data.message) return data.message;
    const detail = data?.detail;
    if (typeof detail === "string" && detail) return detail;
    if (Array.isArray(detail) && detail.length) {
        const lines = detail.map((item) => {
            const field = item.loc?.[item.loc.length - 1];
            const message = VALIDATION_MESSAGES[item.type] || item.msg;
            return typeof field === "string" && field !== "body"
                ? `${getFieldLabel(field)} — ${message}`
                : message;
        });
        return ["Saqlanmadi. Quyidagi maydonlarni tekshiring:", ...lines.map((l) => `• ${l}`)].join("\n");
    }
    return fallback;
};
