import React from "react";

function Attendance() {
  const attendance = [
    {
      month: "Mart 2024",
      subjects: [
        {
          name: "Web dasturlash",
          total: 16,
          present: 15,
          absent: 1,
          excused: 0,
          percentage: 93.75,
          details: [
            { date: "2024-03-01", status: "present" },
            { date: "2024-03-05", status: "present" },
            { date: "2024-03-08", status: "absent" },
            { date: "2024-03-12", status: "present" },
            { date: "2024-03-15", status: "present" },
          ],
        },
        {
          name: "Ma'lumotlar bazasi",
          total: 12,
          present: 12,
          absent: 0,
          excused: 0,
          percentage: 100,
          details: [
            { date: "2024-03-02", status: "present" },
            { date: "2024-03-06", status: "present" },
            { date: "2024-03-09", status: "present" },
            { date: "2024-03-13", status: "present" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Davomatlar</h2>

      {attendance.map((month, index) => (
        <div key={index} className="bg-white rounded-lg shadow">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              {month.month}
            </h3>
          </div>
          <div className="p-4">
            {month.subjects.map((subject, subIndex) => (
              <div key={subIndex} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">{subject.name}</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Davomat: {subject.percentage}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Jami darslar</div>
                    <div className="text-2xl font-bold text-[#2557A7]">
                      {subject.total}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Qatnashdi</div>
                    <div className="text-2xl font-bold text-green-600">
                      {subject.present}
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Qatnashmadi</div>
                    <div className="text-2xl font-bold text-red-600">
                      {subject.absent}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Sababli</div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {subject.excused}
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {subject.details.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`p-2 text-center ${
                          day.status === "present"
                            ? "bg-green-100"
                            : day.status === "absent"
                            ? "bg-red-100"
                            : "bg-white"
                        }`}
                      >
                        <div className="text-sm text-gray-600">
                          {new Date(day.date).getDate()}
                        </div>
                        <div className="text-xs mt-1">
                          {day.status === "present"
                            ? "✓"
                            : day.status === "absent"
                            ? "✗"
                            : "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Attendance;
