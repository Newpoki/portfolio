"use client";

import { useCallback } from "react";
import { Typography } from "../components/typography";

export const FooterScrollTopButton = () => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Typography
      as="button"
      onClick={handleClick}
      className="transition-colors hover:text-gray-500"
    >
      Back to top ↑
    </Typography>
  );
};
