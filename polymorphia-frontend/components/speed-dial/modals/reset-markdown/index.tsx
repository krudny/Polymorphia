import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import useModalContext from "@/hooks/contexts/useModalContext";
import useMarkdownSource from "@/hooks/course/useMarkdownSource";

function ResetMarkdownModalContent() {
  const { resetMarkdown, markdownType } = useMarkdownContext();
  const { data: markdownSource } = useMarkdownSource(markdownType);
  const { closeModal } = useModalContext();

  const handleConfirm = () => {
    // resetMarkdown doesn't need any arguments - that's why we pass undefined here.
    resetMarkdown(undefined, {
      onSuccess: closeModal,
    });
  };

  if (!markdownSource) {
    return null;
  }

  return (
    <div className="update-markdown-wrapper">
      <h1>
        Zresetowanie markdowna usunie wszystkie zmiany i wczyta plik z GitHuba
        od nowa!
      </h1>
      <div className="update-markdown-link">
        <h1>Link źródłowy:</h1>
        <a
          href={markdownSource.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {markdownSource.sourceUrl}
        </a>
      </div>
      <h1>Czy na pewno chcesz kontynuować?</h1>
      <div className="update-markdown-buttons">
        <ButtonWithBorder
          text="Powrót"
          className="!mx-0 !py-0 !w-full"
          onClick={closeModal}
        />
        <ButtonWithBorder
          text="Zatwierdź"
          className="!mx-0 !py-0 !w-full"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}

export default function ResetMarkdownModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Resetowanie">
      <ResetMarkdownModalContent />
    </Modal>
  );
}
