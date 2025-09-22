import {AnyFieldApi} from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="mx-auto text-center">
      {field.state.meta.isBlurred && !field.state.meta.isValid ? (
        <>
          {field.state.meta.errors
            .map((err) => (typeof err === "string" ? err : err.message))
            .join(", ")}
        </>
      ) : null}
    </div>
  );
}
