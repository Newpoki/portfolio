import type { InternalLinkProps } from "@/components/ui/link";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

type Props = Omit<InternalLinkProps, "type"> & {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  to: NonNullable<InternalLinkProps["to"]>;
};

export const HeaderLink = ({ className, children, onClick, to }: Props) => {
  return (
    <Link
      className={cn(className, "capitalize [&.active]:after:scale-x-100")}
      onClick={onClick}
      type="internal"
      animation="expanse-center"
      to={to}
    >
      {children}
    </Link>
  );
};
