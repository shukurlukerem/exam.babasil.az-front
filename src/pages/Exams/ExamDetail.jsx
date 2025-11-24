import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ExamDetail() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hər sualın seçilmiş cavabı burada saxlanılır
  const [answers, setAnswers] = useState({});

  // Cavab seçilməsi
  const handleSelect = (questionId, choice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  useEffect(() => {
    fetch(`http://localhost:8005/api/exams/${id}/questions/`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Yüklənir...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">İmtahan #{id}</h1>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="p-6 bg-white rounded-xl shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-4">
              {index + 1}. {q.question}
            </h2>

            <div className="space-y-3 text-[17px]">
              {/* A */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question_${q.id}`}
                  value="A"
                  checked={answers[q.id] === "A"}
                  onChange={() => handleSelect(q.id, "A")}
                />
                <span>A) {q.variant_A}</span>
              </label>

              {/* B */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question_${q.id}`}
                  value="B"
                  checked={answers[q.id] === "B"}
                  onChange={() => handleSelect(q.id, "B")}
                />
                <span>B) {q.variant_B}</span>
              </label>

              {/* C */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question_${q.id}`}
                  value="C"
                  checked={answers[q.id] === "C"}
                  onChange={() => handleSelect(q.id, "C")}
                />
                <span>C) {q.variant_C}</span>
              </label>

              {/* D */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question_${q.id}`}
                  value="D"
                  checked={answers[q.id] === "D"}
                  onChange={() => handleSelect(q.id, "D")}
                />
                <span>D) {q.variant_D}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
