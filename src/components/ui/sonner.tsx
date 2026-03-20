import { Toaster as Sonner } from "sonner";
import type { Theme } from "../theme/theme";
import type { ToasterProps as SonnerToasterProps } from "sonner";

type ToasterProps = Omit<SonnerToasterProps, "theme"> & {
  theme: Theme;
};

const Toaster = ({ theme, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme === "auto" ? "system" : theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
