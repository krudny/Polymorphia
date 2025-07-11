import Modal from "@/components/modal/Modal";
import XPCard from "@/components/xp-card/XPCard";
import { API_STATIC_URL } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";

export default function GroupModal({
  isActive,
  onClosed,
}: {
  isActive: boolean;
  onClosed: () => void;
}) {
  const { data: users } = useQuery({
    queryKey: ["random user"],
    queryFn: () => UserService.getRandomUsers(),
  });

  return (
    <Modal
      isDataPresented={isActive}
      onClosed={onClosed}
      title="Grupa"
      subtitle="Oto skład twojej grupy:"
    >
      <div className="flex flex-col gap-2">
        {users?.map((user) => (
          <XPCard
            key={user.userId}
            title={user.userName}
            subtitle={user.group + " | " + user.evolutionStage}
            image={{
              url: `${API_STATIC_URL}/${user.profileImage}`,
              alt: user.userName,
            }}
            size="xs"
          />
        ))}
      </div>
    </Modal>
  );
}
