"use client";

import useLogout from "@/hooks/course/useLogout";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      hasLoggedOut.current = true;
      logout();
      router.push("/");
    }
  }, [logout, router]);
}
