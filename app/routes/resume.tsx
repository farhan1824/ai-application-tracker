import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Ats from "~/components/Ats";
import Details from "~/components/Details";
import Summary from "~/components/summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Resume Details" },
  { name: "Description", content: "View your resume details." },
];

const resume = () => {
  const { kv, isLoading, auth, fs } = usePuterStore();
  const navigate = useNavigate();
  // useEffect(() => {
  // if (!isLoading && !auth.isAuthenticated) {
  //     navigate("/auth?next=/resume/${id}");
  //   }
  // }, [isLoading, navigate]);
  const { id } = useParams();
  const [imageurl, setimageurl] = useState("");
  const [resumeurl, setresumeurl] = useState("");
  const [feedback, setfeedback] = useState<Feedback | null>(null);
  //   const navigate = useNavigate();
  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const resumeData = JSON.parse(resume);
      //   getting the resume and image from the fs
      const resumeBlob = await fs.read(resumeData.resumePath);
      //   const resumeBlob = await fs.read(resumeData.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeurl = URL.createObjectURL(pdfBlob);
      setresumeurl(resumeurl);
      const imageBlob = await fs.read(resumeData.imageFile);
      //   const imageBlob = await fs.read(resumeData.imagePath);
      if (!imageBlob) return;
      const imgBlob = new Blob([imageBlob], { type: "image/png" });
      const imageurl = URL.createObjectURL(imgBlob);
      setimageurl(imageurl);
      setfeedback(resumeData.feedback);
      console.log({ imageurl, resumeurl, feedback: resumeData.feedback });
    };
    loadResume();
  }, [id]);

  return (
    <main className="pt-0!">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="" className="w-2.5 h-2.5" />
          <span className="text-sm font-bold">Back to home</span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse  bg-[url('/images/bg-small.svg')] bg-cover">
        <section className="feedback-section h-screen w-full sticky top-0 items-center justify-center">
          {imageurl && resumeurl && (
            <>
              <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                <a href={resumeurl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={imageurl}
                    alt="Resume"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </a>
                {/* <a href={resumeurl} target="_blank" rel="noopener noreferrer">
                View Resume
                </a> */}
              </div>
            </>
          )}
        </section>
        <section className="feedback-section">
          <h1>Resume Review</h1>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <p>Summary Ats Details</p>
              <Summary feedback={feedback}></Summary>
              <Ats
                score={feedback.ATS.score | 0}
                suggestion={feedback.ATS.tips || []}
              ></Ats>
              <Details></Details>
            </div>
          ) : (
            <img
              src="/images/resume-scan-2.gif"
              className="w-full"
              alt="Loading feedback"
            />
          )}
        </section>
      </div>
      <div>resume is :{id}</div>;
    </main>
  );
};

export default resume;
