import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout
      title="Smart access for modern farmers"
      subtitle="Login or create your account to use AI tools, crop support, weather insights, and your farm profile."
    >
      <div className="auth-toggle">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
          type="button"
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
          type="button"
        >
          Signup
        </button>
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}
    </AuthLayout>
  );
}

export default AuthPage;