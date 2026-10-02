import React from "react";

function Schedule() {
  const schedule = [
    {
      day: "Dushanba",
      lessons: [
        {
          time: "08:30 - 09:50",
          subject: "Web dasturlash",
          type: "Amaliy",
          room: "214",
          teacher: "Abdullayev A.A.",
        },
        {
          time: "10:00 - 11:20",
          subject: "Ma'lumotlar bazasi",
          type: "Ma'ruza",
          room: "306",
          teacher: "Karimov K.K.",
        },
      ],
    },
    {
      day: "Seshanba",
      lessons: [
        {
          time: "08:30 - 09:50",
          subject: "Dasturlash asoslari",
          type: "Laboratoriya",
          room: "103",
          teacher: "Toshmatov T.T.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dars jadvali</h2>

      {schedule.map((day, index) => (
        <div key={index} className="bg-white rounded-lg shadow">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">{day.day}</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {day.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-600">
                      {lesson.time}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {lesson.subject}
                      </div>
                      <div className="text-sm text-gray-500">
                        {lesson.type} • {lesson.room}-xona • {lesson.teacher}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Schedule;
