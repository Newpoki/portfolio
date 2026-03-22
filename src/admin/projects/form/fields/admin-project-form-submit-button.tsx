import { Loader2Icon } from "lucide-react";
import { useFormContext } from "../admin-project-form-utils";
import { Button } from "@/ui/button";

type AdminProjectFormSubmitButtonProps = {
  label: string;
};

export const AdminProjectFormSubmitButton = ({
  label,
}: AdminProjectFormSubmitButtonProps) => {
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
