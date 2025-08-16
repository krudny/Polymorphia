import { LoginDto } from "@/interfaces/api/login";
import { API_HOST } from "@/services/api";

const AuthService = {
  login: async ({ email, password }: LoginDto) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: params.toString(),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to login");
  },
};

export default AuthService;
