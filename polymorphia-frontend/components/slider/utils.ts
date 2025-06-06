import { SliderSlide } from "@/interfaces/slider/SliderInterfaces";

export function shiftArray(arr: SliderSlide[], shift: number) {
  const len = arr.length;
  const offset = ((shift % len) + len) % len;
  return arr.slice(offset).concat(arr.slice(0, offset));
}
