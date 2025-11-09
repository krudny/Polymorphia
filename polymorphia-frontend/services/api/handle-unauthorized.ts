import AuthService from "@/services/auth";

export default async function handleUnauthorized() {
  await AuthService.logout();
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}
