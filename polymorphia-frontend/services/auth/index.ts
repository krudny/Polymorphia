import { LoginDTO } from "@/interfaces/api/login";
import { readErrorMessage } from "@/services/api/client";
import { API_HOST } from "@/services/api";
import { ApiError } from "@/services/api/error";

const AuthService = {
  login: async ({ email, password }: LoginDTO) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
      body: params,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).catch((_error) => {
      throw new ApiError("Serwer nie odpowiada.", 503);
    });

    if (!response.ok) {
      throw new ApiError(await readErrorMessage(response), response.status);
    }
  },
  logout: async () => {
    await fetch(`${API_HOST}/logout`, {
      method: "POST",
      credentials: "include",
    }).catch((_error) => {
      throw new ApiError("Serwer nie odpowiada.", 503);
    });
  },
};
export default AuthService;
