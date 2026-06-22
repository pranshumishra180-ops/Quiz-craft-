import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPdf.css";

function UploadPdf() {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!pdf) {
      return alert("Please select a PDF");
    }

    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
      setLoading(true);

      const res = await api.post(
        "/ai/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      navigate("/quiz");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1>📄 Upload PDF</h1>

        <form onSubmit={handleUpload}>
         <label className="upload-area">
  <input
    type="file"
    accept=".pdf"
    hidden
    onChange={(e) =>
      setPdf(e.target.files[0])
    }
  />

  <div className="upload-content">
    <h2>📄</h2>

    <p>
      {pdf
        ? pdf.name
        : "Click to Upload PDF"}
    </p>

    <span>
      PDF files only
    </span>
  </div>
</label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPdf;