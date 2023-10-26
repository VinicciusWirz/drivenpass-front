import api from "./api";

export async function get(token: string) {
  const response = await api.get("/credentials", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function post(token: string, body: Credential) {
  const response = await api.post("/credentials", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function remove(token: string, id: number) {
  const response = await api.delete(`/credentials/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
