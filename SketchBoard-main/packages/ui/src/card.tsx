import * as React from "react";

/**
 * A reusable Card component to wrap content sections.
 * It provides a consistent styled container with a title.
 */
export function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={`w-full max-w-md p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-md ${className}`}
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}