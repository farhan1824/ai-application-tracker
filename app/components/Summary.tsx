import React from "react";
import Scoregauge from "./Scoregauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    "font-bold " +
    (score >= 75
      ? "text-green-500"
      : score >= 50
        ? "text-yellow-500"
        : "text-red-500");

  return (
    <section className="resume-summary w-full">
      <div className="category flex justify-between items-center px-4 py-3 border-b last:border-b-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm sm:text-base">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-lg sm:text-2xl">
          <span className={textColor}>{score}</span>
          <span className="font-bold">/100</span>
        </p>
      </div>
    </section>
  );
};

const Summary = ({ feedback }: { feedback?: Feedback | null }) => {
  if (!feedback) return null; // render nothing if feedback is not loaded

  return (
    <section className="bg-white rounded-2xl shadow-md w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center p-4 md:p-6">
        <Scoregauge score={feedback.overallScore ?? 0} />

        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is based on the variables listed below
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <Category
          title="Tone & Style"
          score={feedback.toneAndStyle?.score ?? 0}
        />
        <Category title="Content" score={feedback.content?.score ?? 0} />
        <Category title="Structure" score={feedback.structure?.score ?? 0} />
        <Category title="Skills" score={feedback.skills?.score ?? 0} />
      </div>
    </section>
  );
};

export default Summary;
