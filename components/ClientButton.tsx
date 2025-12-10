"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  projectName: string;
  className?: string;
}

export default function ClientButton({
  children,
  projectName,
  className,
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
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
