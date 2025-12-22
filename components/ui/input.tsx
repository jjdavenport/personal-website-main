"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useVanish } from "@/hooks/useVanish";

interface InputProps extends React.ComponentProps<"input"> {
  vanishOnClear?: boolean;
  onClearComplete?: () => void;
}

function Input({
  className,
  type = "text",
  value = "",
  vanishOnClear = false,
  onClearComplete,
  ...props
}: InputProps) {
  const { canvasRef, inputRef, animating, vanish } =
    useVanish<HTMLInputElement>(String(value), () => {
      onClearComplete?.();
    });

  React.useEffect(() => {
    if (vanishOnClear && value) {
      vanish();
    }
  }, [vanishOnClear, value, vanish]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 origin-top-left scale-50 pt-2 invert dark:invert-0",
          animating ? "opacity-100" : "opacity-0",
        )}
      />
      <input
        ref={inputRef}
        type={type}
        value={value}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-none border-2 bg-transparent px-3 py-1 text-base shadow-xs",
          "transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          animating && "text-transparent caret-transparent",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
