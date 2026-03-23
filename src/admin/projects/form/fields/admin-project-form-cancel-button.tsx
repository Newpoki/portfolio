import { useFormContext } from "../admin-project-form-utils";
import { Button } from "@/ui/button";

type AdminProjectFormCancelButtonProps = {
  label: string;
};

export const AdminProjectFormCancelButton = ({
  label,
}: AdminProjectFormCancelButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        isDirty: state.isDirty,
      })}
    >
      {({ isSubmitting, isDirty }) => {
        // div instead of null to keep space-between layout working
        if (!isDirty) return <div />;

        return (
          <Button
            disabled={isSubmitting}
            type="button"
            variant="ghost"
            onClick={() => form.reset()}
          >
            {label}
          </Button>
        );
      }}
    </form.Subscribe>
  );
};
