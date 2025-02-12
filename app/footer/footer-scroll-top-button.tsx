"use client";

import { useCallback } from "react";

export const FooterScrollTopButton = () => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={handleClick}
      className="hover:text-muted-foreground transition-colors"
      type="button"
    >
      Back to top ↑
    </button>
  );
};
