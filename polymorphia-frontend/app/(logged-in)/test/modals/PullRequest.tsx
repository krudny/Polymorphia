import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function PullRequest({
  isActive,
  onClosed,
}: {
  isActive: boolean;
  onClosed: () => void;
}) {
  return (
    <Modal
      isDataPresented={isActive}
      onClosed={onClosed}
      title="Pull Request"
      // subtitle="Twój pull request został zapisany!"
    >
      <div className="flex gap-x-2 w-fit min-w-52">
        <div className="w-fit whitespace-nowrap">
          <ButtonWithBorder text="Zobacz zadanie" className="!mx-0" size="sm" />
        </div>
        {/*<div className="w-fit whitespace-nowrap">*/}
        {/*  <ButtonWithBorder text="Edytuj zadanie" className="!mx-0" size="sm" />*/}
        {/*</div>*/}
      </div>
    </Modal>
  );
}
