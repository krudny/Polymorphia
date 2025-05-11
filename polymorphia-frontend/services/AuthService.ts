const API_HOST =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const AuthService = {
  login: async (email: string, password: string) => {
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
    return;
  },
};

export default AuthService;
