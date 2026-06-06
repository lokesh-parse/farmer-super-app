export default function CropKnowledgePage() {
  return (
    <div className="wiki-page">
      <div className="wiki-hero">
        <h1>Crop Knowledge 🌾</h1>
        <p>
          Learn about different crops, seasons, soil requirements,
          water needs, fertilizer usage, and yield improvement methods.
        </p>
      </div>

      <div className="wiki-content">
        <section>
          <h2>Wheat</h2>
          <p>Best Season: Rabi</p>
          <p>Soil: Loamy Soil</p>
          <p>Water: Moderate</p>
          <p>Expected Yield: 20-30 Quintal/Acre</p>
        </section>

        <section>
          <h2>Cotton</h2>
          <p>Best Season: Kharif</p>
          <p>Soil: Black Soil</p>
          <p>Water: Medium</p>
          <p>Expected Yield: 8-12 Quintal/Acre</p>
        </section>

        <section>
          <h2>Soybean</h2>
          <p>Best Season: Kharif</p>
          <p>Soil: Well Drained Soil</p>
          <p>Water: Moderate</p>
          <p>Expected Yield: 10-15 Quintal/Acre</p>
        </section>

        <section>
          <h2>Rice</h2>
          <p>Best Season: Kharif</p>
          <p>Soil: Clay Soil</p>
          <p>Water: High</p>
          <p>Expected Yield: 20-25 Quintal/Acre</p>
        </section>
      </div>
    </div>
  );
}