
import {LoginDto} from "@/interfaces/api/DTO";
import {API_HOST} from "@/services/api";

const AuthService = {
  fetchCsrfToken: async (): Promise<string> => {
    const response = await fetch(`${API_HOST}/users/csrf-token`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Nie udało się pobrać tokena CSRF.");
    }
    const data = await response.json();
    console.log(data.token);
    return data.token;
  },

  login: async ({email, password}: LoginDto, csrfToken: string) => {
    console.log("tok: " + csrfToken);
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
    headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-TOKEN": csrfToken,
      }),
      body: params.toString(),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to login");
  },

};

export default AuthService;
