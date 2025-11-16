import AuthService from "@/services/auth";
import { AppRouterInstance } from "@/interfaces/general";

interface HandleLogoutRedirectOptions {
  router: AppRouterInstance;
  redirectPath: string;
}

export default async function handleLogoutRedirect({
  router,
  redirectPath,
}: HandleLogoutRedirectOptions) {
  await AuthService.logout();
  router.push(redirectPath);
}
