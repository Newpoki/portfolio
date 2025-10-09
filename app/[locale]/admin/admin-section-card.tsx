"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, LinkProps } from "../i18n/navigation";

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
