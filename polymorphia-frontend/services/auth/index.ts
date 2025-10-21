import { LoginDTO } from "@/interfaces/api/login";
import { API_HOST } from "@/services/api";

const AuthService = {
  login: async ({ email, password }: LoginDTO) => {
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

    if (!response.ok) {
      throw new Error("Wystąpił błąd przy zalogowaniu");
    }
  },
  logout: async () => {
    const response = await fetch(`${API_HOST}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Wystąpił błąd przy wylogowaniu");
    }
  },
};
export default AuthService;
