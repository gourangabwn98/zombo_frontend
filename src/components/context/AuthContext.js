// src/context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("zombo_user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isLoggedIn: true };
    case "LOGOUT":
      localStorage.removeItem("zombo_user");
      return { ...state, user: null, isLoggedIn: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  });

  // On app load — check if user already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("zombo_user");
    if (savedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(savedUser) });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: (user) => dispatch({ type: "LOGIN", payload: user }),
        logout: () => dispatch({ type: "LOGOUT" }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
