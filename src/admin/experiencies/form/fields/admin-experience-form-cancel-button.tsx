import { useFormContext } from "../admin-experience-form-utils";
import { Button } from "@/components/ui/button";

type AdminExperienceFormCancelButtonProps = {
  label: string;
};

export const AdminExperienceFormCancelButton = ({
  label,
}: AdminExperienceFormCancelButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          disabled={isSubmitting}
          type="button"
          variant="ghost"
          onClick={() => form.reset()}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
};
