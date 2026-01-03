import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string[];
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine gradient background based on score
  const getGradientClass = () => {
    if (score > 69) return "from-green-100 to-green-50";
    if (score > 49) return "from-yellow-100 to-yellow-50";
    return "from-red-100 to-red-50";
  };

  // Determine icon based on score
  const getIcon = () => {
    if (score > 69) return "/icons/ats-good.svg";
    if (score > 49) return "/icons/ats-warning.svg";
    return "/icons/ats-bad.svg";
  };

  // Get suggestion icon based on type
  const getSuggestionIcon = (type: "good" | "improve") => {
    return type === "good" ? "/icons/check.svg" : "/icons/warning.svg";
  };

  return (
    <div
      className={`bg-linear-to-br ${getGradientClass()} rounded-2xl shadow-md p-6 w-full`}
    >
      {/* Top Section with Icon and Headline */}
      <div className="flex items-start gap-4 mb-6">
        <img src={getIcon()} alt="ATS Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Applicant Tracking System Compatibility
        </h3>
        <p className="text-gray-600 text-sm">
          Your resume's ATS compatibility score indicates how well your document
          will be parsed and ranked by automated hiring systems. A higher score
          means better readability for ATS scanners.
        </p>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-4">Suggestions:</h4>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex gap-3 items-start">
                <img
                  src={getSuggestionIcon(suggestion.type)}
                  alt="Suggestion Icon"
                  className="w-5 h-5 mt-0.5 shrink-0"
                />
                <div>
                  {suggestion.tip.map((tip, tipIndex) => (
                    <p key={tipIndex} className="text-sm text-gray-700">
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Encouragement */}
      <div className="pt-4 border-t border-gray-300 border-opacity-50">
        <p className="text-sm text-gray-700 italic">
          Keep improving your resume structure and formatting to maximize your
          chances with ATS systems.
        </p>
      </div>
    </div>
  );
};

// export default ATS;
// import { cn } from "~/lib/utils";

// const ATS = ({
//   score,
//   suggestions,
// }: {
//   score: number;
//   suggestions: { type: "good" | "improve"; tip: string }[];
// }) => {
//   return (
//     <div
//       className={cn(
//         "rounded-2xl shadow-md w-full bg-linear-to-br to-light-white p-8 flex flex-col gap-4",
//         score > 69
//           ? "from-green-100"
//           : score > 49
//           ? "from-yellow-100"
//           : "from-red-100"
//       )}
//     >
//       <div className="flex flex-row gap-4 items-center">
//         <img
//           src={
//             score > 69
//               ? "/icons/ats-good.svg"
//               : score > 49
//               ? "/icons/ats-warning.svg"
//               : "/icons/ats-bad.svg"
//           }
//           alt="ATS"
//           className="w-10 h-10"
//         />
//         <p className="text-2xl font-semibold">ATS Score - {score}/100</p>
//       </div>
//       <div className="flex flex-col gap-2">
//         <p className="font-medium text-xl">
//           How well does your resume pass through Applicant Tracking Systems?
//         </p>
//         <p className="text-lg text-gray-500">
//           Your resume was scanned like an employer would. Here's how it
//           performed:
//         </p>
//         {suggestions.map((suggestion, index) => (
//           <div className="flex flex-row gap-2 items-center" key={index}>
//             <img
//               src={
//                 suggestion.type === "good"
//                   ? "/icons/check.svg"
//                   : "/icons/warning.svg"
//               }
//               alt="ATS"
//               className="w-4 h-4"
//             />
//             <p className="text-lg text-gray-500">{suggestion.tip}</p>
//           </div>
//         ))}
//         <p className="text-lg text-gray-500">
//           Want a better score? Improve your resume by applying the suggestions
//           listed below.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ATS;
