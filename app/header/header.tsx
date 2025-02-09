import JavascriptIcon from "@/public/icons/javascript.svg";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="main-layout-page-wrapper sticky top-0 z-50 mb-8 flex items-center justify-between border-b-1 border-b-gray-100 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MenuIcon />

      <JavascriptIcon className="w-8 lg:w-8" />
    </div>
  );
};
