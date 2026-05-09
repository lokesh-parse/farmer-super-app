const { signupUser, loginUser } = require("../services/auth/authService");

function handleSignup(req, res) {
  const { name, email, password } = req.body;

  const result = signupUser({ name, email, password });

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
}

function handleLogin(req, res) {
  const { email, password } = req.body;

  const result = loginUser({ email, password });

  if (!result.success) {
    return res.status(401).json(result);
  }

  res.json(result);
}

module.exports = {
  handleSignup,
  handleLogin,
};