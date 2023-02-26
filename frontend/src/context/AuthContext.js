import { createContext, useReducer, useEffect } from "react";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SETADMIN":
      return { ...state, admin: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    admin: false,
  });

  useEffect(() => {
    const Us = JSON.parse(localStorage.getItem("user"));
    if (Us) {
      const { user, admin } = Us;
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "SETADMIN", payload: admin });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
