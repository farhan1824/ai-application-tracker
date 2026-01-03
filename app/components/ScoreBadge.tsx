import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeClass = "";
  let label = "";

  if (score >= 75) {
    badgeClass = "bg-green-100 text-green-600";
    label = "Strong";
  } else if (score >= 50) {
    badgeClass = "bg-yellow-100 text-yellow-600";
    label = "Good Start";
  } else {
    badgeClass = "bg-red-100 text-red-600";
    label = "Needs Work";
  }

  return (
    <span
      className={`
        ${badgeClass}
        inline-flex items-center justify-center
        px-2 py-0.5 sm:px-3 sm:py-1
        rounded-full font-semibold
        text-[10px] sm:text-xs
        whitespace-nowrap
      `}
    >
      {label}
    </span>
  );
};

export default ScoreBadge;
