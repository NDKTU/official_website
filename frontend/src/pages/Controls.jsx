import React from "react";

function Controls() {
  const controls = [
    {
      type: "Oraliq nazorat",
      subject: "Web dasturlash",
      date: "2024-03-20",
      time: "09:00",
      room: "214-xona",
      max_score: 20,
      score: 18,
    },
    {
      type: "Yakuniy nazorat",
      subject: "Ma'lumotlar bazasi",
      date: "2024-03-25",
      time: "14:00",
      room: "306-xona",
      max_score: 30,
      score: null,
    },
    {
      type: "Joriy nazorat",
      subject: "Dasturlash asoslari",
      date: "2024-03-15",
      time: "11:30",
      room: "103-xona",
      max_score: 10,
      score: 8,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Nazoratlar</h2>

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
                <th className="p-3 text-gray-600">Nazorat turi</th>
                <th className="p-3 text-gray-600">Fan</th>
                <th className="p-3 text-gray-600">Sana</th>
                <th className="p-3 text-gray-600">Vaqt</th>
                <th className="p-3 text-gray-600">Xona</th>
                <th className="p-3 text-gray-600">Ball</th>
              </tr>
            </thead>
            <tbody>
              {controls.map((control, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{control.type}</td>
                  <td className="p-3">{control.subject}</td>
                  <td className="p-3">{control.date}</td>
                  <td className="p-3">{control.time}</td>
                  <td className="p-3">{control.room}</td>
                  <td className="p-3">
                    {control.score !== null ? (
                      <span className="font-medium text-green-600">
                        {control.score}/{control.max_score}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
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

export default Controls;
