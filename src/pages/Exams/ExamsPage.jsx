import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8005/api/exams/")
      .then((res) => res.json())
      .then((data) => {
        setExams(data);
        setLoading(false);
        console.log("data :" , data);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Mövcud İmtahanlar</h1>

      <div className="space-y-8">
        {exams.map((exam) => (
            
          <div
            key={exam.id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-3">{exam.description}</p>

            <p className="text-blue-600 font-semibold mb-4">
              {exam.questions_count} sual
            </p>

            <Link
            to={`/exam/${exam.id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
            İmtahana giriş et
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
