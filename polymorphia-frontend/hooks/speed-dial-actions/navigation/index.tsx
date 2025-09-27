import { SpeedDialItemAction } from "@/components/speed-dial/types";
import { usePathname, useRouter } from "next/navigation";

export function useGoBackSpeedDialAction(): SpeedDialItemAction {
  const router = useRouter();

  return {
    onClick: router.back,
  };
}

export function useAppendToPathSpeedDialAction(
  urlToAppend: string
): SpeedDialItemAction {
  const router = useRouter();
  const pathname = usePathname();

  const newPath = pathname + urlToAppend;
  return {
    onClick: () => router.push(newPath),
  };
}

export function useNavigateToParentUrlSpeedDialAction(): SpeedDialItemAction {
  const router = useRouter();
  const pathname = usePathname();

  const newPath = pathname.split("/").slice(0, -1).join("/");
  return {
    onClick: () => router.push(newPath),
  };
}
