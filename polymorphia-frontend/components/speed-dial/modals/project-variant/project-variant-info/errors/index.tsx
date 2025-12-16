import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";

const errorMessage = "Nie udało się załadować wariantów projektu.";
export const errorComponent = <ErrorComponent message={errorMessage} />;

export const errorComponentCompact = (
  <ErrorComponent message={errorMessage} size={ErrorComponentSizes.COMPACT} />
);

const noProjectVariantsErrorTitle = "Brak wariantów projektu";
const noProjectVariantsErrorMessage =
  "Tej grupie nie zostały przypisane żadne warianty projektu.";

export const noProjectVariantsErrorComponent = (
  <ErrorComponent
    title={noProjectVariantsErrorTitle}
    message={noProjectVariantsErrorMessage}
  />
);

export const noProjectVariantsErrorComponentCompact = (
  <ErrorComponent
    title={noProjectVariantsErrorTitle}
    message={noProjectVariantsErrorMessage}
    size={ErrorComponentSizes.COMPACT}
  />
);
