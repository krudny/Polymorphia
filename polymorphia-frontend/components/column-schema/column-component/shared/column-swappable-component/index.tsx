import useTargetContext from "@/hooks/contexts/useTargetContext";
import { ColumnSwappableComponentProps } from "./types";
import clsx from "clsx";
import {
  baseSwapAnimationWrapperProps,
  SwapAnimationWrapper,
} from "@/animations/SwapAnimationWrapper";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";
import Loading from "@/components/loading";

export default function ColumnSwappableComponent<T>({
  data,
  isDataLoading,
  isDataError,
  renderComponent,
  renderDataErrorComponent,
  minHeightClassName,
}: ColumnSwappableComponentProps<T>) {
  const { selectedTarget } = useTargetContext();

  const targetKey = getKeyForSelectedTarget(selectedTarget);
  const targetKeySuffix = isDataLoading
    ? "_loading"
    : isDataError || data === undefined
      ? "_error"
      : "";
  const key =
    selectedTarget === null ? "noTarget" : targetKey + targetKeySuffix;

  let content;

  if (selectedTarget === null) {
    content = undefined;
  } else if (isDataLoading) {
    content = (
      <div className="relative">
        <Loading />
      </div>
    );
  } else if (isDataError || data === undefined) {
    content = renderDataErrorComponent();
  } else {
    content = renderComponent(data, key);
  }

  return (
    <SwapAnimationWrapper {...baseSwapAnimationWrapperProps} keyProp={key}>
      <div className={clsx(minHeightClassName)}>{content}</div>
    </SwapAnimationWrapper>
  );
}
