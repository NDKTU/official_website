import React from "react";

function Payments() {
  const payments = [
    {
      id: "PAY001",
      amount: "5,000,000",
      type: "To'lov-kontrakt",
      method: "Click",
      status: "Tasdiqlangan",
      date: "2024-03-01",
    },
    {
      id: "PAY002",
      amount: "5,000,000",
      type: "To'lov-kontrakt",
      method: "Payme",
      status: "Tasdiqlangan",
      date: "2023-12-01",
    },
    {
      id: "PAY003",
      amount: "5,000,000",
      type: "To'lov-kontrakt",
      method: "Bank o'tkazmasi",
      status: "Kutilmoqda",
      date: "2024-03-15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">To'lovlar</h2>
        <button className="btn-primary">To'lov qilish</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Kontrakt summasi
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            15,000,000 so'm
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">To'langan</h3>
          <div className="text-2xl font-bold text-green-600">
            10,000,000 so'm
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Qolgan summa
          </h3>
          <div className="text-2xl font-bold text-red-600">5,000,000 so'm</div>
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
                <th className="p-3 text-gray-600">Summa</th>
                <th className="p-3 text-gray-600">To'lov turi</th>
                <th className="p-3 text-gray-600">To'lov usuli</th>
                <th className="p-3 text-gray-600">Holat</th>
                <th className="p-3 text-gray-600">Sana</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{payment.id}</td>
                  <td className="p-3">{payment.amount} so'm</td>
                  <td className="p-3">{payment.type}</td>
                  <td className="p-3">{payment.method}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === "Tasdiqlangan"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-3">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
