function CropUpload({ preview, loading, onImageChange, onAnalyze }) {
  return (
    <div className="crop-card">
      <h3>Upload Crop Image</h3>

      <input type="file" accept="image/*" onChange={onImageChange} />

      {preview && (
        <img src={preview} alt="Crop Preview" className="crop-preview" />
      )}

      <button type="button" onClick={onAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Crop"}
      </button>
    </div>
  );
}

export default CropUpload;