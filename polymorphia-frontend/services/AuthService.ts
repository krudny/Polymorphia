
import {LoginDto} from "@/interfaces/api/DTO";
import {API_HOST} from "@/services/api";
import Cookies from "js-cookie";

const AuthService = {
  login: async ({email, password}: LoginDto) => {
    const params = new URLSearchParams();
    await AuthService.getCsrfToken();
    const csrfToken = Cookies.get("XSRF-TOKEN");
    if (!csrfToken) {
      throw new Error("Brak tokena CSRF");
    }
    params.append("username", email);
    params.append("password", password);

    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN": csrfToken,
      }),
      body: params.toString(),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to login");
  },

  getCsrfToken: async () => {
    await fetch(`${API_HOST}/users/csrf-token`, {
      credentials: "include",
    });
  }
};

export default AuthService;
