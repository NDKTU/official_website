import React from "react";

function Records() {
  const records = [
    {
      id: "REC001",
      subject: "Web dasturlash",
      type: "Oraliq nazorat",
      date: "2024-03-10",
      status: "Tasdiqlangan",
      score: "28/30",
    },
    {
      id: "REC002",
      subject: "Ma'lumotlar bazasi",
      type: "Joriy nazorat",
      date: "2024-03-15",
      status: "Kutilmoqda",
      score: "-",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Qaydnomalar</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            2023-2024 o'quv yili, 4-semestr
          </h3>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">ID</th>
                <th className="p-3 text-gray-600">Fan</th>
                <th className="p-3 text-gray-600">Nazorat turi</th>
                <th className="p-3 text-gray-600">Sana</th>
                <th className="p-3 text-gray-600">Holat</th>
                <th className="p-3 text-gray-600">Ball</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{record.id}</td>
                  <td className="p-3">{record.subject}</td>
                  <td className="p-3">{record.type}</td>
                  <td className="p-3">{record.date}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === "Tasdiqlangan"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {record.score === "-" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <span className="font-medium text-green-600">
                        {record.score}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Records;
