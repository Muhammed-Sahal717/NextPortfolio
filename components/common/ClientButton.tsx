"use client";

import { ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  projectName: string;
  className?: string;
}

export default function ClientButton({
  children,
  projectName,
  className,
  variant,
  size,
}: Props) {
  const handleClick = () => {
    // Dispatch the Custom Event that ChatWidget listens for
    const event = new CustomEvent("open-chat", {
      detail: {
        message: `Tell me about the architecture of the ${projectName} project.`,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}
