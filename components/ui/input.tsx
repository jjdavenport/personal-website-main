"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useVanish } from "@/hooks/useVanish";

interface InputProps extends React.ComponentProps<"input"> {
  /**
   * When true, triggers the vanish animation.
   * Should be controlled by the parent (Form).
   */
  vanishOnClear?: boolean;

  /**
   * Called AFTER the vanish animation finishes.
   * Use this to actually clear form state.
   */
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
  const { canvasRef, inputRef, animating, vanish } = useVanish(
    String(value),
    () => {
      onClearComplete?.();
    },
  );

  /**
   * Run animation ONLY when parent explicitly asks for it
   */
  React.useEffect(() => {
    if (vanishOnClear && value) {
      vanish();
    }
  }, [vanishOnClear, value, vanish]);

  return (
    <div className="relative">
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 origin-top-left scale-50",
          animating ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Input */}
      <input
        ref={inputRef}
        type={type}
        value={value}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-none border bg-transparent px-3 py-1 text-base shadow-xs",
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
