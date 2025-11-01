import toast from "react-hot-toast";
import { Fetch, UseFetch } from "@/hooks/general/useFetch/types";
import { useCallback } from "react";
import useLogout from "@/hooks/course/useLogout";

export default function useFetch(): UseFetch {
  const { mutate: logout } = useLogout({ showToast: false });

  const customFetch: Fetch = useCallback(
    async (input, init) => {
      const response = await fetch(input, init);
      if (response.status === 401) {
        toast.error("Sesja wygasła. Zaloguj się ponownie.", {
          id: "session-expired-toast",
        });
        logout();
        throw new Error("Session expired");
      }
      return response;
    },
    [logout]
  );

  return { fetch: customFetch };
}
