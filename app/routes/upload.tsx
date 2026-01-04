export const meta = () => [
  { title: "Resumind | Upload" },
  { name: "Description", content: "Upload your resume." },
];
import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/navbar";
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
const upload = () => {
  const { fs, ai, kv, auth, isLoading } = usePuterStore();
  const [isprocessing, setisprocessing] = useState(false);
  const [statuesText, setstatuesText] = useState("");
  const navigate = useNavigate();
  const handelAnalyze = async ({
    file,
    companyName,
    jobTitle,
    jobDescription,
  }: {
    file: File;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
  }) => {
    setisprocessing(true);
    setstatuesText("Uploading your resume...");
    const uploadFile = await fs.upload([file]);
    if (!uploadFile) return setstatuesText("Upload failed.");

    setstatuesText("Analyzing your resume...");

    const imageFile = await convertPdfToImage(file);

    if (!imageFile.file) {
      setstatuesText(imageFile.error ?? "Failed to convert PDF to image");
      return;
    }

    setstatuesText("Uploading image...");

    const uploadImage = await fs.upload([imageFile.file]);

    if (!uploadImage) {
      setstatuesText("Upload failed.");
      return;
    }

    setstatuesText("Processing image...");
    const UUid = generateUUID();
    const data = {
      companyName,
      jobTitle,
      jobDescription,
      id: UUid,
      resumePath: uploadFile.path,
      imageFile: uploadImage.path,
      feedback: [],
    };
    await kv.set(`resume:${UUid}`, JSON.stringify(data));
    setstatuesText("Analyzing...");

    const feedback = await ai.feedback(
      uploadFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) {
      setstatuesText("Analysis failed.");
      return;
    }

    let parsedFeedback;

    try {
      parsedFeedback =
        typeof feedback.message.content === "string"
          ? JSON.parse(feedback.message.content)
          : JSON.parse(feedback.message.content[0].text);
    } catch (err) {
      console.error(err);
      setstatuesText("Invalid AI response.");
      return;
    }

    data.feedback = parsedFeedback;

    // save FINAL data
    await kv.set(`resume:${UUid}`, JSON.stringify(data));

    setstatuesText("Analysis complete!");
    navigate(`/resume/${UUid}`);

    // console.log(data);
  };

  const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;
    handelAnalyze({ file, companyName, jobTitle, jobDescription });
    // console.log({ companyName, jobTitle, jobDescription, file });
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
            <img src="/images/resume-scan.gif" alt="" />
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
