import React from "react";
import { Download } from "lucide-react";

function Contracts() {
  const contracts = [
    {
      id: "CON001",
      year: "2023-2024",
      type: "To'lov-kontrakt",
      amount: "15,000,000",
      status: "Tasdiqlangan",
      date: "2023-09-01",
    },
    {
      id: "CON002",
      year: "2022-2023",
      type: "To'lov-kontrakt",
      amount: "13,000,000",
      status: "Yakunlangan",
      date: "2022-09-01",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Shartnomalar</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">ID</th>
                <th className="p-3 text-gray-600">O'quv yili</th>
                <th className="p-3 text-gray-600">Shartnoma turi</th>
                <th className="p-3 text-gray-600">Summa</th>
                <th className="p-3 text-gray-600">Holat</th>
                <th className="p-3 text-gray-600">Sana</th>
                <th className="p-3 text-gray-600">Fayl</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{contract.id}</td>
                  <td className="p-3">{contract.year}</td>
                  <td className="p-3">{contract.type}</td>
                  <td className="p-3">{contract.amount} so'm</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contract.status === "Tasdiqlangan"
                          ? "bg-green-100 text-green-800"
                          : contract.status === "Yakunlangan"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {contract.status}
                    </span>
                  </td>
                  <td className="p-3">{contract.date}</td>
                  <td className="p-3">
                    <button className="text-[#2557A7] hover:text-blue-700 flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>PDF</span>
                    </button>
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

export default Contracts;
