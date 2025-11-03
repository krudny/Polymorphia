import { LoginDTO } from "@/interfaces/api/login";
import { postEndpoint } from "@/services/api/client";

const AuthService = {
  login: async ({ email, password }: LoginDTO) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    await postEndpoint("/login", params.toString(), false, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  },
  logout: async () => {
    await postEndpoint("/logout");
  },
};
export default AuthService;
