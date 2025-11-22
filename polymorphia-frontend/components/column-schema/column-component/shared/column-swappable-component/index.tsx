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
  renderEmptyDataErrorComponent,
  minHeightClassName,
}: ColumnSwappableComponentProps<T>) {
  const { selectedTarget } = useTargetContext();

  const isDataLoadingUtil = isDataLoading;
  const isDataErrorUtil = isDataError || data === undefined;
  const isDataEmpty =
    renderEmptyDataErrorComponent !== undefined &&
    Array.isArray(data) &&
    data.length === 0;

  const targetKey = getKeyForSelectedTarget(selectedTarget);
  const targetKeySuffix = isDataLoadingUtil
    ? "_loading"
    : isDataErrorUtil
      ? "_error"
      : isDataEmpty
        ? "_empty"
        : "";
  const key =
    selectedTarget === null ? "noTarget" : targetKey + targetKeySuffix;

  let content;

  if (selectedTarget === null) {
    content = undefined;
  } else if (isDataLoadingUtil) {
    content = (
      <div className="relative">
        <Loading />
      </div>
    );
  } else if (isDataErrorUtil) {
    content = renderDataErrorComponent();
  } else if (isDataEmpty) {
    content = renderEmptyDataErrorComponent();
  } else {
    content = renderComponent(data, key);
  }

  return (
    <SwapAnimationWrapper {...baseSwapAnimationWrapperProps} keyProp={key}>
      <div className={clsx("mt-2", minHeightClassName)}>{content}</div>
    </SwapAnimationWrapper>
  );
}
