export const NotificationTypes = {
  NEW_GRADE: "NEW_GRADE",
  NEW_REWARD: "NEW_REWARD",
} as const;

export type NotificationType =
  (typeof NotificationTypes)[keyof typeof NotificationTypes];

export interface NotificationResponseDTO {
  id: number;
  notificationType: NotificationType;
  createdAt: string;
  description: string;
  gradableEventId?: number;
  rewardId?: number;
}
