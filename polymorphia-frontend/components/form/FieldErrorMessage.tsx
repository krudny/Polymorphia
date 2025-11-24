import { FieldErrorMessageProps } from "@/components/form/types";

export function FieldErrorMessage({ field }: FieldErrorMessageProps) {
  return (
    <div className="mx-auto text-center">
      {field.state.meta.isBlurred && !field.state.meta.isValid
        ? field.state.meta.errors.map((error, index) => (
            <div key={index}>
              {typeof error === "string" ? error : error.message}
            </div>
          ))
        : null}
    </div>
  );
}
