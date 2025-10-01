import {Role} from "@/interfaces/api/user";
import {AppRouterInstance} from "@/interfaces/general";

export interface RedirectProps {
  userRole: Role;
  defaultRedirect: string;
  router: AppRouterInstance;
}
