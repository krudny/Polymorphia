"use client";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardAssign from "@/components/xp-card/components/XPCardAssign";

export default function AssignRewardModal({ isVisible, setIsVisible }) {
  const [curr, setCurr] = useState(0);

  return (
    <Modal
      isDataPresented={isVisible}
      onClosed={() => setIsVisible(false)}
      title="Przypisz nagrody"
    >
      <div className="w-full flex flex-col gap-y-2">
        {[1, 2, 3].map((val, index) => (
          <XPCard
            key={index}
            title="Złota skrzynka"
            subtitle="10% do kategorii Laboratoria"
            size="xs"
            leftComponent={
              <XPCardImage imageUrl="images/chests/s1.png" alt={""} />
            }
            rightComponent={
              <XPCardAssign
                currentAssigned={curr}
                maxAssigned={3}
                increment={() => setCurr(Math.min(curr + 1, 3))}
                decrement={() => setCurr(Math.max(curr - 1, 0))}
              />
            }
          />
        ))}
      </div>
    </Modal>
  );
}
