import React from "react";

function Scholarship() {
  const scholarships = [
    {
      id: "SCH001",
      type: "Davlat stipendiyasi",
      amount: "500,000",
      status: "To'langan",
      date: "2024-03-05",
    },
    {
      id: "SCH002",
      type: "Davlat stipendiyasi",
      amount: "500,000",
      status: "To'langan",
      date: "2024-02-05",
    },
    {
      id: "SCH003",
      type: "Davlat stipendiyasi",
      amount: "500,000",
      status: "Kutilmoqda",
      date: "2024-04-05",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Stipendiya</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Joriy stipendiya
          </h3>
          <div className="text-2xl font-bold text-gray-900">500,000 so'm</div>
          <p className="text-sm text-gray-500 mt-2">Davlat stipendiyasi</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Keyingi to'lov
          </h3>
          <div className="text-2xl font-bold text-[#2557A7]">2024-04-05</div>
          <p className="text-sm text-gray-500 mt-2">500,000 so'm</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            To'lovlar tarixi
          </h3>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">ID</th>
                <th className="p-3 text-gray-600">Stipendiya turi</th>
                <th className="p-3 text-gray-600">Summa</th>
                <th className="p-3 text-gray-600">Holat</th>
                <th className="p-3 text-gray-600">Sana</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{scholarship.id}</td>
                  <td className="p-3">{scholarship.type}</td>
                  <td className="p-3">{scholarship.amount} so'm</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        scholarship.status === "To'langan"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {scholarship.status}
                    </span>
                  </td>
                  <td className="p-3">{scholarship.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Scholarship;
