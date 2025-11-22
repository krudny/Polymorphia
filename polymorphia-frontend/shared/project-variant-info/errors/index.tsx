import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";

export const errorComponent = (
  <ErrorComponent
    message="Nie udało się załadować wariantów projektu."
    size={ErrorComponentSizes.COMPACT}
  />
);

export const noProjectVariantsErrorComponent = (
  <ErrorComponent
    title="Brak wariantów projektu"
    message="Tej grupie nie zostały przypisane żadne warianty projektu."
    size={ErrorComponentSizes.COMPACT}
  />
);
