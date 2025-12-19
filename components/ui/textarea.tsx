"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useVanish } from "@/hooks/useVanish";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  /**
   * When true, triggers the vanish animation
   */
  vanishOnClear?: boolean;

  /**
   * Called AFTER the vanish animation finishes
   */
  onClearComplete?: () => void;
}

function Textarea({
  className,
  value = "",
  vanishOnClear = false,
  onClearComplete,
  ...props
}: TextareaProps) {
  const { canvasRef, inputRef, animating, vanish } = useVanish(
    String(value),
    () => {
      onClearComplete?.();
    },
  );

  /**
   * Trigger animation only when parent requests it
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
          "pointer-events-none absolute origin-top-left scale-50",
          animating ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Textarea */}
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        data-slot="textarea"
        value={value}
        className={cn(
          "border-input placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-none border bg-transparent px-3 py-2 text-base shadow-xs",
          "transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          animating && "text-transparent caret-transparent",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
