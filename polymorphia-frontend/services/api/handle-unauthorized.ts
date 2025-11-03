import toast from "react-hot-toast";
import AuthService from "@/services/auth";

export default async function handleUnauthorized() {
  toast.error("Sesja wygasła. Zaloguj się ponownie.", {
    id: "session-expired-toast",
  });
  await AuthService.logout();
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}
