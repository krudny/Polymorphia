import { Sizes } from "@/interfaces/general";
import { UserPointsProps } from "@/views/profile/types";

export function getUserPointsProps(
  isMd: boolean,
  isXl: boolean,
  is2Xl: boolean
): UserPointsProps {
  if (is2Xl) {
    return {
      className: "profile-user-points-2xl",
      titleSize: Sizes.MD,
      xpSize: Sizes.LG,
    };
  }

  if (isXl) {
    return {
      className: "profile-user-points-2xl",
      titleSize: Sizes.MD,
      xpSize: Sizes.LG,
    };
  }

  if (isMd) {
    return {
      className: "profile-user-points-md",
      titleSize: Sizes.SM,
      xpSize: Sizes.MD,
    };
  }

  return {
    className: "profile-user-points-xs",
    titleSize: Sizes.SM,
    xpSize: Sizes.MD,
  };
}
