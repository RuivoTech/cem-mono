import React, { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import api from "../services/api";
import { onSignIn, onSignOut, getSession, getThemeInUse, onChangeTheme } from "../services/authStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const themeInUse = getThemeInUse();

    setTheme(themeInUse);
    const session = getSession();
    if (Boolean(session)) {
      api.defaults.headers.Authorization = `Bearer ${session}`;
      const token = jwt.decode(session);
      getUser(token.id);
    }
  }, []);

  async function Login(email, password) {
    return api.post("/login", { email, senha: password })
      .then(response => {
        onSignIn(response.data.token);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        const token = jwt.decode(response.data.token)

        return getUser(token.id);
      })
      .catch(error => {
        return error.response.data;
      })
  }

  async function getUser(id) {
    return await api.get("/usuarios/" + id)
      .then(responseUser => {
        setUser(responseUser.data);
        return responseUser.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  function Logout() {
    setUser(null);

    onSignOut();
  }

  function toggleTheme() {
    let newTheme = onChangeTheme();
    setTheme(newTheme);
  }

  return (
    <AuthContext.Provider value={{ user, Login, Logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;