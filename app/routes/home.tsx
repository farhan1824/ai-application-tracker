import Navbar from "~/components/navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import ResumeCard from "~/components/ResumeCard";
import resume from "./resume";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Checker" },
    {
      name: "description",
      content: "Review your CV before applying for your dream job",
    },
  ];
}
export default function Home() {
  const { auth, fs, kv } = usePuterStore();
  const [resumeUrl, setresumeUrl] = useState("");
  const [resumes, setresumes] = useState<Resume[]>([]);
  const [loadingResumes, setloadingResumes] = useState(false);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!auth.isAuthenticated) {
  //     navigate("/auth?next=/");
  //   }
  // }, [auth.isAuthenticated, navigate]);
  useEffect(() => {
    const loadResume = async () => {
      setloadingResumes(true);

      try {
        // Correctly pass pattern and returnValues as two arguments
        const items = (await kv.list("resume:*", true)) as KVItem[];
        const parseResumes = items?.map(
          (item) => JSON.parse(item.value) as Resume
        );
        console.log(parseResumes);
        setresumes(parseResumes ?? []);
      } catch (err) {
        console.error("Failed to load resumes:", err);
        setresumes([]);
      } finally {
        setloadingResumes(false);
      }
    };

    loadResume();
  }, [kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
  <Navbar />

  {/* Header */}
  <section className="main-section text-center py-16">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
      Track your application and resume status with AI-powered insights
    </h1>
  </section>

  {/* Loading state */}
  {loadingResumes && (
    <div className="flex justify-center my-12">
      <img
        src="/images/resume-scan-2.gif"
        className="w-48 h-auto"
        alt="Scanning resumes..."
      />
    </div>
  )}

  {/* No resumes */}
  {!loadingResumes && resumes.length === 0 && (
    <p className="text-center text-gray-500 mt-8">
      No resumes found. Upload your resume to get started.
    </p>
  )}

  {/* Resumes list */}
  {!loadingResumes && resumes.length > 0 && (
    <section className="resumes-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </section>
  )}
</main>

  );
}
