import * as React from "react";

// Define the props for the Input component.
// It accepts all standard HTML input attributes.
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * A styled, reusable input component.
 * It forwards the ref to the underlying input element,
 * making it compatible with form libraries.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full px-4 py-2 text-foreground bg-transparent border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-100 disabled:cursor-not-allowed
        transition-colors duration-200 ease-in-out ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
// Set a display name for better debugging in React DevTools.
Input.displayName = "Input";

export { Input };