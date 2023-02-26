import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { auth, isLoading, error } = useAuth();

  const handleError = () => {
    if (Array.isArray(error)) {
      return (
        <div className="error">
          {error.map((element, i) => (
            <span key={i}>
              * {element}
              <br />
            </span>
          ))}
        </div>
      );
    } else if (error) return <div className="error">{error}</div>;
  };

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
    await auth(formData.email, formData.password, "signup");
  };

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h3>Signup</h3>

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
      <button disabled={isLoading}>Sign Up</button>
      {handleError()}
    </form>
  );
};

export default Signup;
