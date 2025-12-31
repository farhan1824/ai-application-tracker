import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000 group"
    >
      <div className="resume-card-header text-center">
        <div className="flex flex-col items-center ">
          <h2 className="text-3xl font-bold text-black leading-tight">
            {resume.companyName ?? "Unknown Company"}
          </h2>
          <h3 className="text-xl text-slate-500 mt-1">
            {resume.jobTitle ?? "Unknown Job Title"}
          </h3>
        </div>

        <div className="shrink-0 my-4">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      {/* Container for the Resume Preview */}
      <div className="resume-image-container">
        <img
          className="resume-image"
          src={resume.imagePath}
          alt={`${resume.companyName} preview`}
        />
      </div>
    </Link>
  );
};

export default ResumeCard;
