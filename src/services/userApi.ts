import api from "./api";

export async function signUp(email: string, password: string): Promise<void> {
  const response = await api.post("/auth/users/sign-up", { email, password });
  return response.data;
}

export async function signIn(
  email: string,
  password: string
): Promise<{
  token: string;
}> {
  const response = await api.post("/auth/users/sign-in", { email, password });
  return response.data;
}

export async function fetchCount(token: string) {
  const response = await api.get("/users/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
