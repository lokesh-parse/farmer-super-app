import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { analyzeCropImage } from "../../services/cropDoctorService";

function CropDoctorPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image || loading) return;

    setLoading(true);

    try {
      const data = await analyzeCropImage(image);
      setResult(data);
    } catch (error) {
      setResult({
        disease: "Analysis failed",
        confidence: "--",
        advice: ["Could not connect to crop diagnosis server."],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-doctor-page">
      <PageHeader
        title="Crop Doctor"
        subtitle="Upload crop image and get disease guidance."
      />

      <div className="crop-doctor-grid">
        <div className="crop-card">
          <h3>Upload Image</h3>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <img src={preview} alt="preview" className="crop-preview" />
          )}

          <button onClick={handleAnalyze} disabled={!image || loading}>
            {loading ? "Analyzing..." : "Analyze Crop"}
          </button>
        </div>

        <div className="crop-card">
          <h3>Result</h3>

          {result ? (
            <div className="crop-result">
              <p><strong>Disease:</strong> {result.disease}</p>
              <p><strong>Confidence:</strong> {result.confidence}</p>

              <ul>
                {Array.isArray(result.advice) ? (
                  result.advice.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>{result.advice || "No advice available."}</li>
                )}
              </ul>

              {result.imageUrl && (
                <p>
                  <strong>Uploaded File:</strong> Saved on server
                </p>
              )}
            </div>
          ) : (
            <p>No analysis yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropDoctorPage;