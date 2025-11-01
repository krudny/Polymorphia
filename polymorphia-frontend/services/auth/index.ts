import { LoginDTO } from "@/interfaces/api/login";
import { apiFetch } from "@/services/api/client";

const AuthService = {
  login: async ({ email, password }: LoginDTO) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    await apiFetch("/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: params.toString(),
    });
  },
  logout: async () => {
    await apiFetch("/logout", {
      method: "POST",
    });
  },
};
export default AuthService;
