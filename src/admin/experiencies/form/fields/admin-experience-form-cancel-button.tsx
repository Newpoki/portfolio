import { useFormContext } from "../admin-experience-form-utils";
import { Button } from "@/ui/button";

type AdminExperienceFormCancelButtonProps = {
  label: string;
};

export const AdminExperienceFormCancelButton = ({
  label,
}: AdminExperienceFormCancelButtonProps) => {
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
