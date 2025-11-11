import AuthService from "@/services/auth";

export default async function handleUnauthorized() {
  await AuthService.logout();
  window.location.href = "/";
}
