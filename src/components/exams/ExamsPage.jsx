import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ExamsPage() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("<http:localhost:8005></http:localhost:8005>/api/exams/")
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Mövcud İmtahanlar</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <h3 className="text-xl font-bold text-black dark:text-white mb-1">
              {exam.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {exam.description}
            </p>

            <p className="text-sm font-medium text-primary dark:text-sky-400 mb-4">
              {exam.questions_count} sual
            </p>

            <button
              onClick={() => navigate(`/exam/${exam.id}`)}
              className="w-full rounded bg-primary py-2 text-white font-semibold hover:bg-opacity-90"
            >
              İmtahana giriş et
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamsPage;
