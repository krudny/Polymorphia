import { useEffect, useLayoutEffect } from "react";
import { UseFindMeScrollParams } from "./types";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";
import toast from "react-hot-toast";
import shakeInOut from "@/animations/ShakeInOut";

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

  useEffect(() => {
    if (!shouldScrollToMe || userRole !== Roles.STUDENT || !hallOfFame) {
      return;
    }

    const targetPage = hallOfFame.currentUserPage;

    if (targetPage === -1) {
      toast.error("Zwierzak nie jest w wynikach!");
      setShouldScrollToMe(false);
      return;
    }

    if (targetPage !== page) {
      setPage(targetPage);
    }
  }, [
    shouldScrollToMe,
    hallOfFame,
    userRole,
    page,
    setPage,
    setShouldScrollToMe,
    userDetails,
  ]);

  useLayoutEffect(() => {
    if (
      !shouldScrollToMe ||
      isLoading ||
      userRole !== Roles.STUDENT ||
      !hallOfFame
    ) {
      return;
    }

    const position = userDetails.position;
    const element = recordRefs.current?.[position];

    if (element) {
      const scrollContainer = element.parentElement || document.documentElement;

      let scrollHappened = false;

      const handleScroll = () => {
        scrollHappened = true;
      };

      const handleScrollEnd = () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        shakeInOut(element);
      };

      scrollContainer.addEventListener("scroll", handleScroll, { once: true });
      scrollContainer.addEventListener("scrollend", handleScrollEnd, {
        once: true,
      });

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        if (!scrollHappened) {
          scrollContainer.removeEventListener("scrollend", handleScrollEnd);
          shakeInOut(element);
        }
      }, 300);

      setShouldScrollToMe(false);
    }
  }, [
    hallOfFame,
    shouldScrollToMe,
    isLoading,
    userRole,
    recordRefs,
    setShouldScrollToMe,
    userDetails,
  ]);
};
