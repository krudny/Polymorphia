import { Role } from "@/interfaces/api/user";
import { AppRouterInstance } from "@/interfaces/general";

interface RedirectProps {
  userRole: Role;
  defaultRedirect: string;
  router: AppRouterInstance;
}

export function redirectToNextStep({
  userRole,
  defaultRedirect,
  router,
}: RedirectProps) {
  switch (userRole) {
    case "STUDENT":
      router.push("/profile");
      break;
    case "INSTRUCTOR":
    case "COORDINATOR":
      router.push("/course/groups");
      break;
    default:
      router.push(defaultRedirect);
      break;
  }
}
