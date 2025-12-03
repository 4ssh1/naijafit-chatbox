"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium " +
    "bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed " +
    "transition-colors";

  return (
    <button
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
