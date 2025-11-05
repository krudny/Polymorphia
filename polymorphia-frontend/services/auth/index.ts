import { LoginDTO } from "@/interfaces/api/login";
import { ApiClient } from "@/services/api/client";
import { API_HOST } from "@/services/api";

const AuthService = {
  login: async ({ email, password }: LoginDTO) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    await ApiClient.post("/login", params, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  },
  logout: async () => {
    await fetch(`${API_HOST}/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};
export default AuthService;
