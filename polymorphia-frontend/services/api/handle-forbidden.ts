import { QueryClient } from "@tanstack/query-core";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import { AppRouterInstance } from "@/interfaces/general";
import { Role, Roles } from "@/interfaces/api/user";
import UserService from "@/services/user";

interface HandleForbiddenOptions {
  queryClient: QueryClient;
  router: AppRouterInstance;
}

export default async function handleForbidden({
  queryClient,
  router,
}: HandleForbiddenOptions) {
  const userRole =
    queryClient.getQueryData<Role>(["userRole"]) ??
    (await queryClient.fetchQuery({
      queryKey: ["userRole"],
      queryFn: UserService.getUserRole,
    })) ??
    Roles.UNDEFINED;

  redirectToNextStep({
    userRole,
    defaultRedirect: "/welcome",
    router,
  });
}
