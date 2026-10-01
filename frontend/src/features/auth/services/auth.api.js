// Thin wrapper around the /api/auth endpoints exposed by the backend.
// The backend sets an httpOnly-style cookie named "token" on register/login,
// so every request must be sent with credentials so the cookie round-trips.

const BASE_URL = "/api/auth";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const authApi = {
  register: (username, email, password) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }),

  login: (email, password) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request("/logout", { method: "GET" }),

  getMe: () => request("/get-me", { method: "GET" }),
};
