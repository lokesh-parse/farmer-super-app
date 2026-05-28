import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import CropUpload from "../../components/crop/CropUpload";
import CropResult from "../../components/crop/CropResult";
import { analyzeCropDisease } from "../../services/cropDiseaseService";

function CropDoctorPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const data = await analyzeCropDisease(image);
      setResult(data);
    } catch (error) {
      setResult({
        disease: "Analysis failed",
        confidence: "low",
        symptoms: ["Server connection failed"],
        solution: ["Check backend server and try again"],
        warning: "Unable to analyze image right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-doctor-page">
      <PageHeader
        title="Crop Doctor"
        subtitle="Upload a crop image and get disease guidance."
      />

      <div className="crop-doctor-grid">
        <CropUpload
          preview={preview}
          loading={loading}
          onImageChange={handleImageChange}
          onAnalyze={handleAnalyze}
        />

        <CropResult result={result} />
      </div>
    </div>
  );
}

export default CropDoctorPage;