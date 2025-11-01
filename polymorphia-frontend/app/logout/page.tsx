"use client";

import useLogout from "@/hooks/course/useLogout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    if (!hasLoggedOut) {
      setHasLoggedOut(true);
      logout();
    }
  }, [logout, router, hasLoggedOut]);
}
