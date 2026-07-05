import React from "react";

export function AdminCellWrapper({
  children,
  index,
  className = "",
  columnsLg = 3,
  columnsMd = 2,
}: {
  children?: React.ReactNode;
  index: number;
  className?: string;
  columnsLg?: number;
  columnsMd?: number;
}) {
  const isLgInternal = index >= columnsLg && index % columnsLg !== 0;
  const isMdInternal = index >= columnsMd && index % columnsMd !== 0;

  return (
    <div className={`relative w-full h-full bg-background ${className}`}>
      {/* LG Diamond */}
      {isLgInternal && (
        <div className="hidden lg:block absolute -top-[0.5px] -left-[0.5px] w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-border" />
      )}
      {/* MD Diamond */}
      {isMdInternal && (
        <div className="hidden md:block lg:hidden absolute -top-[0.5px] -left-[0.5px] w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-border" />
      )}
      {children}
    </div>
  );
}

export function AdminGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-px bg-border border border-border rounded-xl overflow-hidden shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
