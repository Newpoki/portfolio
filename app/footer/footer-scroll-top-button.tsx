"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export const FooterScrollTopButton = () => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Button
      onClick={handleClick}
      className="hover:text-muted-foreground transition-colors"
      type="button"
      variant="ghost"
    >
      Back to top ↑
    </Button>
  );
};
