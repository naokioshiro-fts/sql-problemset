"use client";

import { useState, useRef } from "react";
import { Question, Category } from "@/types";
import { useReactToPrint } from "react-to-print";

interface Props {
  category: Category;
  questions: Question[];
}

export default function QuizClient({ category, questions }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `SQL問題集_${category.name}`,
    pageStyle: `
      @page { size: A4; margin: 1.5cm; }
      body { font-size: 10pt; color: #000; }
      .print-question { page-break-inside: avoid; margin-bottom: 0.8em; border: 1px solid #aaa; padding: 0.5em 0.7em; border-radius: 3px; }
      .sql-block { font-family: monospace; background: #f5f5f5; padding: 0.3em 0.5em; border-radius: 2px; white-space: pre-wrap; word-break: break-all; font-size: 9.5pt; }
      .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3em; margin-top: 0.3em; }
      .option-item { font-size: 9pt; padding: 0.2em 0.4em; border: 1px solid #ccc; border-radius: 2px; }
      .answer-line { font-size: 8.5pt; color: #555; margin-top: 0.3em; border-top: 1px dotted #ccc; padding-top: 0.3em; }
    `,
  });

  const handleSelect = (questionId: number, option: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowAnswers(false);
  };

  const score = submitted
    ? questions.filter((q) => answers[q.id] === q.answer).length
    : 0;

  const LABELS = ["A", "B", "C", "D"];

  const colorBg: Record<string, string> = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-500",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
    teal: "bg-teal-600",
    indigo: "bg-indigo-600",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`rounded-xl p-5 mb-6 text-white no-print ${colorBg[category.color]}`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{category.icon}</span>
              <h1 className="text-2xl font-bold">{category.name}</h1>
            </div>
            <p className="text-sm opacity-80">{questions.length}問 | {category.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a
              href="/"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              ← トップへ
            </a>
            <button
              onClick={() => handlePrint()}
              className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
            >
              🖨️ PDF印刷
            </button>
          </div>
        </div>

        {submitted && (
          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <p className="text-lg font-bold">
              得点: {score} / {questions.length}問
              　（正答率: {Math.round((score / questions.length) * 100)}%）
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={handleReset}
                className="bg-white text-gray-700 hover:bg-gray-100 px-3 py-1 rounded text-sm font-medium"
              >
                リセット
              </button>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="bg-white/30 hover:bg-white/40 text-white px-3 py-1 rounded text-sm font-medium"
              >
                {showAnswers ? "解説を隠す" : "全解説を表示"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button (top) */}
      {!submitted && (
        <div className="mb-4 flex justify-end no-print">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length === 0}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition"
          >
            採点する ({Object.keys(answers).length}/{questions.length}問回答済)
          </button>
        </div>
      )}

      {/* Print-only Header */}
      <div className="hidden print:block mb-4">
        <div className="text-center font-bold text-2xl mb-1">SQL問題集 ― {category.name}</div>
        <div className="text-right text-xs text-gray-500 border-b border-gray-400 pb-1 mb-2">
          全{questions.length}問　　氏名：＿＿＿＿＿＿＿＿　　点数：＿＿＿／{questions.length}
        </div>
      </div>

      {/* Questions */}
      <div ref={printRef} className="space-y-4">
        {/* Print-only Header inside ref */}
        <div className="hidden print:block mb-4">
          <div className="text-center font-bold text-2xl mb-1">SQL問題集 ― {category.name}</div>
          <div className="text-right text-xs text-gray-500 border-b border-gray-400 pb-1 mb-2">
            全{questions.length}問　　氏名：＿＿＿＿＿＿＿＿　　点数：＿＿＿／{questions.length}
          </div>
        </div>

        {questions.map((q, idx) => {
          const selected = answers[q.id];
          const isCorrect = submitted && selected === q.answer;
          const isWrong = submitted && selected !== undefined && selected !== q.answer;
          const isUnanswered = submitted && selected === undefined;

          let cardBorder = "border-gray-200";
          if (isCorrect) cardBorder = "border-green-400";
          if (isWrong) cardBorder = "border-red-400";
          if (isUnanswered) cardBorder = "border-yellow-400";

          return (
            <div
              key={q.id}
              className={`print-question bg-white rounded-xl border-2 p-4 ${cardBorder} transition-colors`}
            >
              {/* Question Number & Title */}
              <div className="flex items-start gap-2 mb-2">
                <span className="shrink-0 bg-gray-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-700 font-medium">{q.question}</p>
                {submitted && (
                  <span className="ml-auto shrink-0 text-lg">
                    {isCorrect ? "✅" : isWrong ? "❌" : "⚠️"}
                  </span>
                )}
              </div>

              {/* SQL Block */}
              <pre className="sql-block bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-mono text-gray-800 mb-3 whitespace-pre-wrap break-all">
                {q.sql}
              </pre>

              {/* Options */}
              <div className="options-grid grid grid-cols-2 gap-2">
                {q.options.map((opt, i) => {
                  const label = LABELS[i];
                  const isSelected = selected === opt;
                  const isAnswer = opt === q.answer;

                  let optStyle =
                    "border border-gray-200 text-gray-700 bg-white hover:bg-gray-50";
                  if (!submitted) {
                    if (isSelected) {
                      optStyle = "border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold";
                    }
                  } else {
                    if (isAnswer) {
                      optStyle = "border-2 border-green-500 bg-green-50 text-green-700 font-semibold";
                    } else if (isSelected && !isAnswer) {
                      optStyle = "border-2 border-red-400 bg-red-50 text-red-700 line-through";
                    } else {
                      optStyle = "border border-gray-200 text-gray-400 bg-gray-50";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`option-item text-left px-3 py-2 rounded-lg text-sm transition cursor-pointer ${optStyle}`}
                    >
                      <span className="font-bold mr-1">{label}.</span> {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (on submit or showAnswers) */}
              {(submitted && (showAnswers || isWrong || isUnanswered)) && (
                <div className="answer-line mt-3 pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-green-700">正解: {q.answer}</span>
                  <p className="text-xs text-gray-600 mt-1">{q.explanation}</p>
                </div>
              )}
              {submitted && isCorrect && !showAnswers && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setShowAnswers(true)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    解説を見る
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button (bottom) */}
      {!submitted && (
        <div className="mt-6 flex justify-center no-print">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length === 0}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-lg transition"
          >
            採点する ({Object.keys(answers).length}/{questions.length}問回答済)
          </button>
        </div>
      )}

      {submitted && (
        <div className="mt-6 flex justify-center gap-3 no-print">
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            もう一度挑戦
          </button>
          <a
            href="/"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium"
          >
            カテゴリ選択に戻る
          </a>
        </div>
      )}
    </div>
  );
}
