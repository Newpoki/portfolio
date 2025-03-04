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

type AdminCreationCardProps = {
  title: string;
  content: string;
  linkProps: LinkProps;
};

export const AdminCreationCard = ({
  title,
  content,
  linkProps,
}: AdminCreationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{content}</CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <Link {...linkProps} />
        </Button>
      </CardFooter>
    </Card>
  );
};
