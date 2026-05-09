import { useState } from "react";
import { signupUser } from "../../services/authService";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await signupUser(formData);
      setMessage(res.message || "Signup completed");
    } catch (error) {
      setMessage("Server error during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <p className="auth-form-text">Start using Farmer Super App</p>

      <label>Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Create password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </button>

      {message && <p className="auth-message">{message}</p>}
    </form>
  );
}

export default SignupForm;