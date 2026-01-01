export const meta = () => [
  { title: "Resumind | Upload" },
  { name: "Description", content: "Upload your resume." },
];
import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/navbar";
const upload = () => {
  const [isprocessing, setisprocessing] = useState(false);
  const [statuesText, setstatuesText] = useState("");
  const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    console.log({ companyName, jobTitle, jobDescription, file });
  };
  const [file, setfile] = useState<File | null>(null);
  const handelFileSelect = (file: File | null) => {
    setfile(file);
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        {isprocessing ? (
          <>
            <h2>{statuesText}</h2>
            <img src="/images/resume-scan-2.gif" alt="" />
          </>
        ) : (
          <>
            <h2>Upload your resume</h2>
          </>
        )}
        {!isprocessing && (
          <form
            id="upload-form"
            onSubmit={handelFormSubmit}
            className="flex flex-col gap-4"
          >
            <div className="form-div">
              <label htmlFor="company-name">Company Name</label>
              <input
                type="text"
                name="company-name"
                placeholder="Company Name"
                id="company-name"
              />
            </div>
            <div className="form-div">
              <label htmlFor="job-title">Job Title</label>
              <input
                type="text"
                name="job-title"
                placeholder="Job Title"
                id="job-title"
              />
            </div>
            <div className="form-div">
              <label htmlFor="job-description">Job Description</label>
              <textarea
                rows={5}
                name="job-description"
                placeholder="Job Description"
                id="job-description"
              />
            </div>
            <div className="form-div">
              <label htmlFor="upload">Upload Resume</label>
              <FileUploader onFileSelect={handelFileSelect} />
            </div>
            <button type="submit" className="primary-button">
              Upload Resume
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default upload;
