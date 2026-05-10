import { SpeedDialItemDynamicBehavior } from "@/components/speed-dial/types";
import { usePathname, useRouter } from "next/navigation";

export function useGoBackSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const router = useRouter();

  return {
    onClick: router.back,
  };
}

export function useAppendToPathSpeedDialDynamicBehavior(
  urlToAppend: string
): SpeedDialItemDynamicBehavior {
  const router = useRouter();
  const pathname = usePathname();

  const newPath = pathname + urlToAppend;
  return {
    onClick: () => router.push(newPath),
  };
}

export function useNavigateToParentUrlSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const router = useRouter();
  const pathname = usePathname();

  const newPath = pathname.split("/").slice(0, -1).join("/");
  return {
    onClick: () => router.push(newPath),
  };
}
