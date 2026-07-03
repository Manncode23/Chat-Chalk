"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const Loader = () => (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  isLoading?: boolean;
}

export const Button = ({ children, className = '', variant = 'primary', isLoading = false, ...props }: ButtonProps) => {

  const baseClasses = 
    'h-11 rounded-lg font-sans font-medium text-base flex items-center justify-center gap-2 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
    'disabled:opacity-75 disabled:cursor-not-allowed transition-colors';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 px-10',
    secondary: 'bg-transparent border border-border text-muted-foreground hover:bg-surface hover:text-foreground px-10',
    icon: 'bg-transparent border border-border text-muted-foreground hover:bg-surface hover:text-foreground aspect-square w-11 p-0', 
  };

  return (
    <motion.button
      variants={buttonVariants}
      whileHover={isLoading ? "" : "hover"}
      whileTap={isLoading ? "" : "tap"}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </motion.button>
  );
};