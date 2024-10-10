import React, { PropsWithChildren, ReactNode } from "react";

function MaxWidth({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`lg:max-w-7xl mx-auto overflow-x-hidden pt-14 px-4 md:px-4  lg:px-0  min-h-screen ${className}`}
    >
      {children}
    </div>
  );
}

export default MaxWidth;
