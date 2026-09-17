import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight transition-[transform,box-shadow,background-color,color] duration-200 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-[2px] active:translate-y-0 motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        primary: "bg-iris text-white shadow-iris hover:bg-iris-soft",
        moss: "bg-moss text-[#062013] shadow-moss hover:brightness-110",
        ember: "bg-ember text-[#210805] shadow-ember hover:brightness-110",
        outline: "border border-line bg-white/[0.02] text-bone hover:border-iris hover:text-white",
        ghost: "text-ash hover:text-bone",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
      shape: { notch: "notch", square: "" },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "notch" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, shape, className }))} {...props} />
  )
);
Button.displayName = "Button";

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => (
    <a ref={ref} className={cn(buttonVariants({ variant, size, shape, className }))} {...props} />
  )
);
LinkButton.displayName = "LinkButton";

export { Button, LinkButton, buttonVariants };
