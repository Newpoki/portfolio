import { Loader2Icon } from "lucide-react";
import { useFormContext } from "../admin-experience-form-utils";
import { Button } from "@/components/ui/button";

type AdminExperienceFormSubmitButtonProps = {
  label: string;
};

export const AdminExperienceFormSubmitButton = ({
  label,
}: AdminExperienceFormSubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader2Icon className="animate-spin" />}

          {label}
        </Button>
      )}
    </form.Subscribe>
  );
};
