import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "transition-[background-color,color,box-shadow,transform] duration-300 ease-(--ease-out-quart) " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 select-none";

const sizes = "h-12 px-6 text-[0.95rem] sm:h-13 sm:px-7";

const variants: Record<Variant, string> = {
  // Ink pill → deep pink on hover (cream text stays AA on both).
  primary:
    "bg-ink text-cream shadow-ink " +
    "hover:bg-pink-deep",
  ghost: "text-ink ring-1 ring-ink/20 hover:ring-ink hover:bg-ink/[0.03]",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${sizes} ${variants[variant]} ${className}`;
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant = "primary", className, children, ...props }: LinkButtonProps) {
  return (
    <Link {...props} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonClasses(variant, className)}>
      {children}
    </button>
  );
}
