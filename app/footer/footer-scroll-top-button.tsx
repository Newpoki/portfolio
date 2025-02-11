"use client";

import { useCallback } from "react";

export const FooterScrollTopButton = () => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={handleClick}
      className="transition-colors hover:text-gray-500"
      type="button"
    >
      Back to top ↑
    </button>
  );
};
