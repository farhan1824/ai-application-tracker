import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { auth, fs } = usePuterStore();
  const [resumeUrl, setresumeUrl] = useState("");
  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setresumeUrl(url);
    };
    loadResume();
  }, [resume.imagePath]);
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000 group"
    >
      <div className="resume-card-header text-center">
        <div className="flex flex-col items-center">
          {resume.companyName && (
            <h2 className="text-3xl font-bold text-black leading-tight">
              {/* {resume.companyName ?? "Unknown Company"} */}
              {resume.companyName}
            </h2>
          )}
          {resume.jobTitle && (
            <h3 className="text-xl text-slate-500 mt-1">
              {resume.jobTitle ?? "Unknown Job Title"}
            </h3>
          )}
          {!resume.jobTitle && !resume.companyName && (
            <h3 className="text-xl text-slate-500 mt-1">Resume</h3>
          )}
        </div>

        <div className="shrink-0 my-4">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className="resume-image-container">
          <img
            className="resume-image"
            src={resumeUrl}
            // src={resume.imagePath}
            alt={`${resume.companyName} preview`}
          />
        </div>
      )}
      {/* Container for the Resume Preview */}
    </Link>
  );
};

export default ResumeCard;
