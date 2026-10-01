import { createContext, useEffect, useState, useCallback } from "react";
import { authApi } from "./auth.api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("checking"); // checking | signed-in | signed-out

  const refresh = useCallback(async () => {
    try {
      const data = await authApi.getMe();
      setUser(data.user);
      setStatus("signed-in");
    } catch {
      setUser(null);
      setStatus("signed-out");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const register = async (username, email, password) => {
    const data = await authApi.register(username, email, password);
    setUser(data.user);
    setStatus("signed-in");
    return data;
  };

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    setUser(data.user);
    setStatus("signed-in");
    return data;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setStatus("signed-out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, status, register, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
