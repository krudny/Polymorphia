import {UseQueryResult} from "@tanstack/react-query";
import {ChestSlide, ItemSlide} from "@/interfaces/slider/SliderInterfaces";

export type ItemQueryResult = UseQueryResult<ItemSlide[] | undefined, Error>;

export type ChestQueryResult = UseQueryResult<ChestSlide[] | undefined, Error>;

export type CombinedQueryResult = {
  data: ItemSlide[] | ChestSlide[] | undefined;
  isLoading: boolean;
  error: Error | null;
};