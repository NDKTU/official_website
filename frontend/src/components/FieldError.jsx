import React from "react";

function FieldError({formik, name}) {
    if (!formik.touched[name] || !formik.errors[name]) return null;
    return (
        <span className="text-red-500 mb-3 p-1 rounded-lg grid  w-fit  transition duration-500">
            {formik.errors[name]}
        </span>
    );
}

export default FieldError;
