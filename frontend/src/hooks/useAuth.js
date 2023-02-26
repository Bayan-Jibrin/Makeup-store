import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  const auth = async (email, password,url) => {
    setIsLoading(true);

    const response = await fetch(`/api/user/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json.user });
      if(url==='login') dispatch({ type: "SETADMIN", payload: json.admin });
      setIsLoading(false);
    }
  };

  return { auth , isLoading, error };
};