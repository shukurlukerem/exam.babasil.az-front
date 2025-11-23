import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ExamDetail() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8003/api/exams/${exam_id}/questions/`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API ERROR:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Yüklənir...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">İmtahan #{id}</h1>

      {questions.length === 0 && (
        <p className="text-gray-500">Bu imtahan üçün sual tapılmadı.</p>
      )}

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="p-6 bg-white rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-3">
              {index + 1}. {q.question}
            </h2>

            <ul className="space-y-2 text-[17px]">
              <li>A) {q.variant_A}</li>
              <li>B) {q.variant_B}</li>
              <li>C) {q.variant_C}</li>
              <li>D) {q.variant_D}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
