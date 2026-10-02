import React from "react";
import { Plus } from "lucide-react";

function Applications() {
  const applications = [
    {
      id: "APP001",
      type: "Ma'lumotnoma",
      status: "Tasdiqlangan",
      date: "2024-03-10",
      description: "O'qish joyidan ma'lumotnoma",
    },
    {
      id: "APP002",
      type: "Akademik ta'til",
      status: "Ko'rib chiqilmoqda",
      date: "2024-03-15",
      description: "Sog'liq bilan bog'liq akademik ta'til",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Arizalar</h2>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Yangi ariza</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">ID</th>
                <th className="p-3 text-gray-600">Ariza turi</th>
                <th className="p-3 text-gray-600">Holati</th>
                <th className="p-3 text-gray-600">Sana</th>
                <th className="p-3 text-gray-600">Izoh</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{application.id}</td>
                  <td className="p-3">{application.type}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        application.status === "Tasdiqlangan"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="p-3">{application.date}</td>
                  <td className="p-3">{application.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Applications;
