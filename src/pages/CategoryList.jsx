import React from "react";

function Groups() {
  const groups = [
    {
      name: "318-21",
      direction: "Dasturiy injiniring",
      students: 25,
      curator: "Abdullayev A.A.",
      schedule: "I-smena",
      semester: 4,
    },
    {
      name: "319-21",
      direction: "Kompyuter injiniringi",
      students: 23,
      curator: "Karimov K.K.",
      schedule: "II-smena",
      semester: 4,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Guruhlar</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">Guruh</th>
                <th className="p-3 text-gray-600">Yo'nalish</th>
                <th className="p-3 text-gray-600">Talabalar</th>
                <th className="p-3 text-gray-600">Kurator</th>
                <th className="p-3 text-gray-600">Smena</th>
                <th className="p-3 text-gray-600">Semestr</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{group.name}</td>
                  <td className="p-3">{group.direction}</td>
                  <td className="p-3">{group.students}</td>
                  <td className="p-3">{group.curator}</td>
                  <td className="p-3">{group.schedule}</td>
                  <td className="p-3">{group.semester}-semestr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Groups;
