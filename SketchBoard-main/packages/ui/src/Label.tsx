import * as React from "react";

/**
 * A styled label component that should be used with form inputs.
 * The `htmlFor` prop is critical for accessibility.
 */
export function Label({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}