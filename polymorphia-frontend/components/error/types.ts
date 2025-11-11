export const ErrorComponentSizes = {
  DEFAULT: "DEFAULT",
  COMPACT: "COMPACT",
} as const;

export type ErrorComponentSize =
  (typeof ErrorComponentSizes)[keyof typeof ErrorComponentSizes];

export interface ErrorComponentProps {
  title: string;
  message: string;
  size: ErrorComponentSize;
}
