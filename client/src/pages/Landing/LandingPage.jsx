import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <p className="landing-badge">Farmer Super App</p>
          <h1>
            Smart digital platform for modern farmers
          </h1>
          <p className="landing-subtitle">
            Ask AI farming questions, detect crop disease, check weather,
            track farm records, view market prices, and connect with the
            farmer community — all in one platform.
          </p>

          <div className="landing-actions">
            <Link to="/auth" className="landing-btn primary">
              Get Started
            </Link>
            <Link to="/app/dashboard" className="landing-btn secondary">
              Open Dashboard
            </Link>
          </div>
        </div>

        <div className="landing-hero-card">
          <h3>What farmers can do</h3>
          <ul>
            <li>Ask AI farming questions</li>
            <li>Upload crop photos for disease guidance</li>
            <li>Check weather with farming advice</li>
            <li>Save farm records</li>
            <li>Compare market prices</li>
            <li>Share in community feed</li>
          </ul>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-section-heading">
          <h2>Core Features</h2>
          <p>Built as a clean, scalable agri-tech product.</p>
        </div>

        <div className="landing-feature-grid">
          <div className="landing-feature-card">
            <h3>AI Chat Assistant</h3>
            <p>Get fast and practical farming guidance.</p>
          </div>

          <div className="landing-feature-card">
            <h3>Crop Doctor</h3>
            <p>Upload crop images and get disease support.</p>
          </div>

          <div className="landing-feature-card">
            <h3>Weather Advisor</h3>
            <p>View weather details with simple farm advice.</p>
          </div>

          <div className="landing-feature-card">
            <h3>Farm Records</h3>
            <p>Track crop, season, expense, and expected yield.</p>
          </div>

          <div className="landing-feature-card">
            <h3>Market Prices</h3>
            <p>Check mandi rates and compare crop prices.</p>
          </div>

          <div className="landing-feature-card">
            <h3>Community</h3>
            <p>Share problems and learn from other farmers.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Start building a smarter farming workflow</h2>
        <p>
          Join the platform and use digital tools for better farming decisions.
        </p>
        <Link to="/auth" className="landing-btn primary">
          Create Account
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;