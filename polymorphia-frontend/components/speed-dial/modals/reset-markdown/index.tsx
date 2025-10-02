import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export default function ResetMarkdownModal({
  onClosedAction,
}: SpeedDialModalProps) {
  const { markdownSource, resetMarkdown } = useMarkdownContext();

  const handleConfirm = () => {
    resetMarkdown();
  };

  if (!markdownSource) {
    return null;
  }

  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Resetowanie">
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
            text="Zatwierdź"
            className="!mx-0 !py-0 !w-full"
            onClick={handleConfirm}
          />
          <ButtonWithBorder
            text="Powrót"
            className="!mx-0 !py-0 !w-full"
            onClick={onClosedAction}
          />
        </div>
      </div>
    </Modal>
  );
}
