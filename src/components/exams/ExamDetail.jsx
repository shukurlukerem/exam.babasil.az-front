import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ExamDetail() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 saat

  useEffect(() => {
    fetch(`http://localhost:8003/api/exams/${id}/questions/`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err));
  }, [id]);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-6">
      {/* Countdown */}
      <div className="mb-6 p-4 bg-white rounded shadow dark:bg-boxdark">
        <h2 className="text-xl font-bold">İmtahan başladı</h2>
        <p className="text-lg text-red-600 font-semibold">
          Qalan vaxt: {formatTime(timeLeft)}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-lg border border-stroke bg-white p-6 shadow dark:border-strokedark dark:bg-boxdark"
          >
            <h3 className="text-lg font-semibold mb-4">
              {idx + 1}. {q.question}
            </h3>

            <div className="space-y-2">
              <label className="block">
                <input type="radio" name={`q_${q.id}`} className="mr-2" />A){" "}
                {q.variant_A}
              </label>

              <label className="block">
                <input type="radio" name={`q_${q.id}`} className="mr-2" />B){" "}
                {q.variant_B}
              </label>

              <label className="block">
                <input type="radio" name={`q_${q.id}`} className="mr-2" />C){" "}
                {q.variant_C}
              </label>

              <label className="block">
                <input type="radio" name={`q_${q.id}`} className="mr-2" />D){" "}
                {q.variant_D}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamDetail;
