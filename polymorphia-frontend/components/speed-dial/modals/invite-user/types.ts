import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import { InviteType } from "@/interfaces/general";

export interface InviteUserModalProps extends SpeedDialModalProps {
  inviteType: InviteType;
}
