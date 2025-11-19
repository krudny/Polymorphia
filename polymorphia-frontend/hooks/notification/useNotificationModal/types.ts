import { GradeModalProps } from "@/components/speed-dial/modals/grade/types";
import { NotificationTypes } from "@/interfaces/api/notification";

export type NotificationModalState =
  | { type: typeof NotificationTypes.NEW_GRADE; props: GradeModalProps }
  | { type: null; props?: never };
