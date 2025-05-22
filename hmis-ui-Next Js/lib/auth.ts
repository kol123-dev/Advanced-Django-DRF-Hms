const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type AuthTokens = {
  access: string;
  refresh: string;
};

/**
 * Logs in the user and stores tokens in localStorage
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthTokens> => {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();
  setAuthTokens(data);
  return data;
};

/**
 * Refreshes the access token using the refresh token
 */
export const refreshToken = async (): Promise<string> => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${API_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    logout();
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json();
  setAuthTokens({ access: data.access, refresh });
  return data.access;
};

/**
 * Fetches current user data
 */
export const getCurrentUser = async () => {
  let token = getAccessToken();
  if (!token) throw new Error("Not logged in");

  const res = await fetch(`${API_URL}/api/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    token = await refreshToken(); // Auto-refresh if expired
    const retryRes = await fetch(`${API_URL}/api/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!retryRes.ok)
      throw new Error("Failed to fetch user after token refresh");

    return await retryRes.json();
  }

  if (!res.ok) throw new Error("Failed to fetch user");

  return await res.json();
};

/**
 * Logout: remove tokens from localStorage
 */
export const logout = () => {
  localStorage.removeItem("auth_tokens");
};

// 🔑 Helpers
const setAuthTokens = (tokens: AuthTokens) => {
  localStorage.setItem("auth_tokens", JSON.stringify(tokens));
};

export const getAccessToken = (): string | null => {
  const tokens = getAuthTokens();
  return tokens?.access || null;
};

export const getRefreshToken = (): string | null => {
  const tokens = getAuthTokens();
  return tokens?.refresh || null;
};

const getAuthTokens = (): AuthTokens | null => {
  const tokensStr = localStorage.getItem("auth_tokens");
  return tokensStr ? JSON.parse(tokensStr) : null;
};
