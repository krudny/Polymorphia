import Modal from "@/components/modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import { SubmissionsModalContentProps } from "./types";
import useSubmissionRequirements from "@/hooks/course/useSubmissionRequirements";
import useSubmissionDetails from "@/hooks/course/useSubmissionDetails";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import { TargetTypes } from "@/interfaces/api/target";
import Loading from "@/components/loading";
import "./index.css";
import { useMediaQuery } from "react-responsive";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { ChangeEventHandler, useState } from "react";
import useSubmissionsUpdate from "@/hooks/course/useSubmissionsUpdate";
import useModalContext from "@/hooks/contexts/useModalContext";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";

const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

function SubmissionsModalContent({
  requirements,
  details,
}: SubmissionsModalContentProps) {
  const isMd = useMediaQuery({ minWidth: "768px" });
  const accordionSections = [...requirements.map(({ id }) => String(id))];
  const initiallyOpenedAccordionSections = new Set(
    accordionSections.length > 0 && isMd ? [accordionSections[0]] : []
  );

  const { closeModal } = useModalContext();

  const { id } = useUserDetails();
  const { mutate } = useSubmissionsUpdate({
    target: { type: TargetTypes.STUDENT, id },
  });

  const [currentDetails, setCurrentDetails] = useState(details.details);
  const [detailsModified, setDetailsModified] = useState(false);

  const mandatoryUrlsNotEmpty = requirements
    .filter((requirement) => requirement.isMandatory)
    .every(
      (requirement) =>
        currentDetails[requirement.id] &&
        currentDetails[requirement.id].url.length > 0
    );

  const validUrls = requirements.every((requirement) => {
    const url = currentDetails[requirement.id]?.url ?? "";
    return url.length === 0 || urlRegex.test(url);
  });

  const isSubmissionValid =
    !detailsModified || (mandatoryUrlsNotEmpty && validUrls);

  const areAllSubmissionsLocked = requirements.every(
    (requirement) => currentDetails[requirement.id].isLocked
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const requirement = requirements.find(
      (requirement) => requirement.id === Number(event.target.id)
    );

    if (!requirement) {
      return;
    }

    if (currentDetails[requirement.id].isLocked) {
      return;
    }

    setCurrentDetails((prev) => ({
      ...prev,
      [requirement.id]: {
        ...prev[requirement.id],
        url: event.target.value,
      },
    }));
    setDetailsModified(true);
  };

  const handleSubmit = () => {
    if (!isSubmissionValid || areAllSubmissionsLocked) {
      return;
    }

    mutate(currentDetails, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <section className="submissions-modal-section">
      <Accordion
        className="submissions-modal-accordion-override"
        sectionIds={new Set(accordionSections)}
        initiallyOpenedSectionIds={initiallyOpenedAccordionSections}
        maxOpen={1}
        shouldAnimateInitialOpen={true}
      >
        {requirements.map((requirement) => {
          const detail = currentDetails[requirement.id];
          if (!detail) {
            return null;
          }

          return (
            <AccordionSection
              key={requirement.id}
              id={String(requirement.id)}
              title={
                requirement.name +
                (!requirement.isMandatory ? " (opcjonalne)" : "")
              }
              headerClassName="submissions-modal-accordion-header"
            >
              <div className="submissions-modal-requirement">
                <div className="submissions-modal-url">
                  <input
                    type="url"
                    id={String(requirement.id)}
                    className="submissions-modal-url-input"
                    placeholder={
                      detail.isLocked
                        ? "Oddawanie zadania zostało zablokowane"
                        : "Wpisz URL do tej części zadania"
                    }
                    value={detail.url}
                    onChange={handleChange}
                    disabled={detail.isLocked}
                  />
                  {detail.isLocked && (
                    <div className="submissions-modal-url-symbol">
                      <span className="material-symbols">lock</span>
                    </div>
                  )}
                </div>
              </div>
            </AccordionSection>
          );
        })}
      </Accordion>
      <div className="submissions-modal-submit-section">
        {!isSubmissionValid && (
          <h3>
            Należy uzupełnić wszystkie obowiązkowe wymagania. Wszystkie
            wypełnione URL muszą być poprawne.
          </h3>
        )}
        <ButtonWithBorder
          text={!areAllSubmissionsLocked ? "Oddaj zadanie" : "Oddane"}
          isActive={isSubmissionValid && !areAllSubmissionsLocked}
          onClick={handleSubmit}
          className="w-full !border-3 !rounded-xl"
        />
      </div>
    </section>
  );
}

export default function SubmissionsModal({
  onClosedAction,
}: SpeedDialModalProps) {
  const {
    userRole,
    userDetails: { id },
  } = useUserContext();

  const {
    data: requirements,
    isLoading: isRequirementsLoading,
    isError: isRequirementsError,
  } = useSubmissionRequirements();

  const {
    data: details,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useSubmissionDetails(
    userRole === Roles.STUDENT ? { type: TargetTypes.STUDENT, id } : null
  );

  const modalContent = () => {
    if (isDetailsLoading || isRequirementsLoading) {
      return (
        <div className="submission-loading">
          <Loading />
        </div>
      );
    }
    if (isDetailsError || isRequirementsError || !requirements || !details) {
      return (
        <div className="submission-error">
          <ErrorComponent
            message="Nie udało się załadować szczegółów zadania."
            size={ErrorComponentSizes.COMPACT}
          />
        </div>
      );
    }
    if (requirements.length === 0) {
      return (
        <div className="submission-error">
          <ErrorComponent
            message="To wydarzenie nie ma żadnych wymagań."
            title="Brak danych"
          />
        </div>
      );
    }
    return (
      <SubmissionsModalContent requirements={requirements} details={details} />
    );
  };

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Oddawanie zadania"
      subtitle={
        details?.modifiedDate
          ? `Ostatnia modyfikacja: ${details.modifiedDate}`
          : "Uzupełnij wymagane linki"
      }
    >
      {modalContent()}
    </Modal>
  );
}
