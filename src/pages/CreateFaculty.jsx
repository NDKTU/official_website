import React from "react";

function StudyPlan() {
    const semesters = [{
        name: "1-semestr", subjects: [{name: "Oliy matematika", credits: 6, hours: 180, type: "Majburiy"}, {
            name: "Dasturlash asoslari", credits: 5, hours: 150, type: "Majburiy",
        }, {name: "Fizika", credits: 4, hours: 120, type: "Majburiy"},],
    },

    ];

    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Fakultet qo'shish</h2>


        <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b bg-gray-50  grid grid-cols-2 gap-3">
                <div className="w-full">
                    <label htmlFor="large-input"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Uzbekcha
                    </label>
                    <input type="text" id="large-input"
                           className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="w-full">
                    <label htmlFor="large-input"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ruscha
                    </label>
                    <input type="text" id="large-input"
                           className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="w-full">
                    <label htmlFor="large-input"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Inglizcha
                    </label>
                    <input type="text" id="large-input"
                           className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="multiple_files">Ikonkani yuklang</label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="multiple_files" type="file" multiple/>
                </div>
            </div>
            <button type="button"
                    className="focus:outline-none w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Qo'shish
            </button>

        </div>

    </div>);
}

export default StudyPlan;
