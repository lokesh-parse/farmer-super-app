import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getCropAdvisory } from "../../services/cropAdvisoryService";

function CropAdvisoryPage() {
  const [form, setForm] = useState({
    cropName: "",
    season: "",
    problem: "",
    location: "",
  });

  const [advice, setAdvice] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await getCropAdvisory(form);
    setAdvice(data);
  };

  return (
    <div>
      <PageHeader
        title="AI Crop Advisory"
        subtitle="Get practical crop guidance based on your problem."
      />

      <div className="advisory-grid">
        <div className="advisory-card">
          <h2>Enter Crop Details</h2>

          <form className="advisory-form" onSubmit={handleSubmit}>
            <input name="cropName" placeholder="Crop Name" value={form.cropName} onChange={handleChange} />
            <input name="season" placeholder="Season" value={form.season} onChange={handleChange} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />

            <textarea
              name="problem"
              placeholder="Describe crop problem"
              value={form.problem}
              onChange={handleChange}
            />

            <button type="submit">Get Advisory</button>
          </form>
        </div>

        <div className="advisory-card">
          <h2>Advisory Result</h2>

          {advice ? (
            <div className="advisory-result">
              <p><strong>Crop:</strong> {advice.cropName}</p>
              <p><strong>Problem:</strong> {advice.problem}</p>

              <h3>Possible Reason</h3>
              <p>{advice.possibleReason}</p>

              <h3>Solution</h3>
              <ul>
                {advice.solution.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3>Precautions</h3>
              <ul>
                {advice.precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                {advice.note && (
                  <p className="advisory-note">{advice.note}</p>
                 )}
              </ul>
            </div>
            
          ) : (
            <p>No advisory generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropAdvisoryPage;