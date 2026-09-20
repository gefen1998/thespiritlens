import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const shape = "rounded-full px-9 py-6 h-auto font-display text-base font-semibold";

const variantMap = {
  primary: { variant: "default", extra: "shadow-lg shadow-primary/25 hover:brightness-110" },
  quiet: { variant: "outline", extra: "border-2 hover:bg-secondary" },
  plain: { variant: "ghost", extra: "text-muted-foreground hover:text-foreground hover:bg-transparent px-0 h-auto py-2" },
};

export default function ActionButton({ variant = "primary", to, className, children, ...props }) {
  const { variant: base, extra } = variantMap[variant];
  const classes = cn(shape, extra, className);

  if (to) {
    return (
      <Button asChild variant={base} className={classes}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </Button>
    );
  }
  return (
    <Button variant={base} className={classes} {...props}>
      {children}
    </Button>
  );
}
