import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-ui transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-xl",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 rounded-xl",
        outline:
          "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-primary-foreground rounded-xl",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 rounded-xl",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "relative overflow-hidden bg-gradient-to-r from-orange to-orange-light text-primary-foreground font-semibold shadow-[0_4px_20px_-4px_hsla(24,100%,50%,0.4)] hover:shadow-[0_8px_30px_-4px_hsla(24,100%,50%,0.5)] hover:-translate-y-1 rounded-xl",
        heroOutline:
          "border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 hover:border-primary-foreground/50 rounded-xl",
        premium:
          "bg-navy text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 rounded-xl",
        glass:
          "bg-card/80 backdrop-blur-md border border-border/50 text-foreground shadow-card hover:shadow-card-hover hover:-translate-y-1 rounded-xl",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs rounded-lg",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg rounded-2xl",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
