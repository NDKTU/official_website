import React from "react";

function RatingBook() {
  const ratings = [
    {
      semester: "4-semestr",
      subjects: [
        {
          name: "Web dasturlash",
          credits: 6,
          current: 86,
          midterm: 90,
          final: null,
          total: null,
          grade: null,
        },
        {
          name: "Ma'lumotlar bazasi",
          credits: 4,
          current: 92,
          midterm: 88,
          final: null,
          total: null,
          grade: null,
        },
        {
          name: "Dasturlash asoslari",
          credits: 5,
          current: 95,
          midterm: 94,
          final: 92,
          total: 93,
          grade: "A",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reyting daftarcha</h2>

      {ratings.map((semester, index) => (
        <div key={index} className="bg-white rounded-lg shadow">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              2023-2024 o'quv yili, {semester.semester}
            </h3>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left">
                  <th className="p-3 text-gray-600">Fan nomi</th>
                  <th className="p-3 text-gray-600">Kredit</th>
                  <th className="p-3 text-gray-600">Joriy (40)</th>
                  <th className="p-3 text-gray-600">Oraliq (30)</th>
                  <th className="p-3 text-gray-600">Yakuniy (30)</th>
                  <th className="p-3 text-gray-600">Umumiy</th>
                  <th className="p-3 text-gray-600">Baho</th>
                </tr>
              </thead>
              <tbody>
                {semester.subjects.map((subject, subIndex) => (
                  <tr key={subIndex} className="border-t">
                    <td className="p-3 font-medium">{subject.name}</td>
                    <td className="p-3">{subject.credits}</td>
                    <td className="p-3">
                      <span className="text-green-600">{subject.current}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-green-600">{subject.midterm}</span>
                    </td>
                    <td className="p-3">
                      {subject.final !== null ? (
                        <span className="text-green-600">{subject.final}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      {subject.total !== null ? (
                        <span className="font-medium text-[#2557A7]">
                          {subject.total}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      {subject.grade !== null ? (
                        <span className="font-medium text-[#2557A7]">
                          {subject.grade}
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
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between text-sm">
              <span>O'rtacha ball: 93</span>
              <span>GPA: 3.67</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RatingBook;
