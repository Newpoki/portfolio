import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

type AdminSectionCardProps = {
  title: string;
  content: string;
  linkProps: LinkProps;
};

export const AdminSectionCard = ({
  title,
  content,
  linkProps,
}: AdminSectionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{content}</CardContent>

      <CardFooter className="mt-auto">
        <Button className="w-full" asChild>
          <Link {...linkProps} />
        </Button>
      </CardFooter>
    </Card>
  );
};
