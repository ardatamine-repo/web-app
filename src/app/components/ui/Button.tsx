import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "green" | "white" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "green",
  size = "md",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  // Clases base comunes
  const baseStyles =
    "w-full rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer";

  // Clases para variantes (asumiendo fondo oscuro de base)
  const variantStyles = {
    green:
      "bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",
    white:
      "bg-white hover:bg-gray-100 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border border-white text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  // Clases para tamaño
  const sizeStyles = {
    sm: "py-1 text-sm",
    md: "py-2 text-base",
    lg: "py-3 text-lg",
  };

  return (
    <button
      type="submit"
      disabled={ disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled&& "opacity-70 cursor-wait",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
