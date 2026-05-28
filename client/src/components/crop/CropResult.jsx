function CropResult({ result }) {
  return (
    <div className="crop-card">
      <h3>Diagnosis Result</h3>

      {!result ? (
        <p>No analysis yet.</p>
      ) : (
        <div className="crop-result">
          <p>
            <strong>Disease:</strong> {result.disease}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>

          <h4>Symptoms</h4>
          <ul>
            {result.symptoms?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Solution</h4>
          <ul>
            {result.solution?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="crop-warning">{result.warning}</p>
        </div>
      )}
    </div>
  );
}

export default CropResult;