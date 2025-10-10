import { useLayoutEffect } from "react";
import { UseFindMeScrollParams } from "./types";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";
import toast from "react-hot-toast";

export const useFindMeScroll = ({
  recordRefs,
  page,
  setPage,
  shouldScrollToMe,
  setShouldScrollToMe,
  isLoading,
  hallOfFame,
}: UseFindMeScrollParams): void => {
  const { userRole, userDetails } = useUserContext();

  useLayoutEffect(() => {
    if (
      !shouldScrollToMe ||
      isLoading ||
      userRole !== Roles.STUDENT ||
      !hallOfFame
    ) {
      return;
    }

    if (targetPage == -1) {
      toast.error("Nie można znaleźć użytkownika!");
      return;
    }

    const position = userDetails.position;
    const element = recordRefs.current?.[position];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setShouldScrollToMe(false);
    }
  }, [
    hallOfFame,
    shouldScrollToMe,
    isLoading,
    userRole,
    recordRefs,
    setShouldScrollToMe,
  ]);

  if (userRole !== Roles.STUDENT || !hallOfFame || !shouldScrollToMe) {
    return;
  }

  const targetPage = hallOfFame.currentUser.page;

  if (targetPage !== page && targetPage !== -1) {
    setPage(targetPage);
  }
};
