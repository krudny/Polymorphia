import { RedirectProps } from "@/app/(welcome)/types";

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
