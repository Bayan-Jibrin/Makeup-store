import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { auth, error, isLoading } = useAuth();

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth(formData.email, formData.password,'login');
  };

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={handleChange}
        name="email"
        value={formData.email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={handleChange}
        name="password"
        value={formData.password}
      />
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
