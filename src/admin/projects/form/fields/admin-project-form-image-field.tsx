import { useMemo, useRef, useState } from "react";
import { useStore } from "@tanstack/react-form";
import { Upload } from "lucide-react";
import { useFieldContext } from "../admin-project-form-utils";
import type { Project } from "@prisma/client";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/ui/field";

type AdminProjectFormImageFieldProps = {
  accept?: string;
  label: string;
  description: string;
  dropzoneLabel: string;
  fileRulesInfos: string;
  project: Project | undefined;
};

export const AdminProjectFormImageField = ({
  accept,
  label,
  description,
  dropzoneLabel,
  fileRulesInfos,
  project,
}: AdminProjectFormImageFieldProps) => {
  const field = useFieldContext<File | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const errors = useStore(field.store, (state) => state.meta.errors);

  // This field needs to show error on change, not waiting for the submit
  const isInvalid = useStore(field.store, (state) => !state.meta.isValid);

  const previewUrl = useMemo(() => {
    if (field.state.value) {
      return URL.createObjectURL(field.state.value);
    }

    console.log(field.state.value, project);

    return project?.illustration ?? null;
  }, [field.state.value, project]);

  const handleFile = (file: File | null) => {
    field.handleChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0] ?? null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  console.log(previewUrl);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-dragging={isDragging || undefined}
        className="flex min-h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input p-4 transition-colors hover:bg-accent/50 aria-invalid:border-destructive data-dragging:border-ring data-dragging:ring-ring/50"
        aria-invalid={isInvalid}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-32 rounded-lg object-cover"
          />
        ) : (
          <>
            <Upload className="size-8 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">{dropzoneLabel}</p>
          </>
        )}
        <p className="text-xs text-muted-foreground">{fileRulesInfos}</p>
      </button>

      <input
        ref={inputRef}
        id={field.name}
        name={field.name}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      <FieldDescription>{description}</FieldDescription>

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};
