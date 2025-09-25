import { useSearchParams } from "next/navigation";

export function useInvitationToken(): string | null {
  const searchParams = useSearchParams();

  return searchParams.get("invitationToken");
}
