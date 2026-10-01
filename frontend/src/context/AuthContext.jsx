import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check for an existing session

  const fetchMe = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/get-me");
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, [fetchMe]);

  async function register(username, email, password) {
    const { data } = await api.post("/auth/register", { username, email, password });
    setUser(data.user);
    return data.user;
  }

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    try {
      await api.get("/auth/logout");
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, refresh: fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
