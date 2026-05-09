function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand-box">
          <p className="auth-badge">Farmer Super App</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          <div className="auth-points">
            <div>AI Farming Assistant</div>
            <div>Crop Disease Support</div>
            <div>Weather-based Advice</div>
            <div>Farmer-first Dashboard</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;