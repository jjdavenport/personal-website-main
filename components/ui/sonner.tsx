"use client";

import { Toaster as Sonner, toast as sonnerToast } from "sonner";
import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { useTheme } from "@/hooks/theme-provider";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const toast = sonnerToast;

export function Toaster() {
  const { darkMode } = useTheme();
  return (
    <Sonner
      theme={darkMode ? "dark" : "light"}
      position="top-center"
      toastOptions={{
        classNames: {
          toast: cn(
            jetBrainsMono.className,
            "pointer-events-auto",
            "flex w-full items-start gap-3",
            "border border-border bg-popover text-popover-foreground",
            "px-4 py-3 shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-80 data-[state=open]:fade-in-80",
            "data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full",
          ),
          title: cn(jetBrainsMono.className, "text-sm font-medium"),
          description: cn(
            jetBrainsMono.className,
            "text-sm text-muted-foreground",
          ),
          closeButton:
            "ml-auto rounded-none p-1 text-muted-foreground hover:text-foreground",
        },
        style: {
          borderRadius: "0px",
        },
      }}
      icons={{
        success: <CheckCircle className="h-4 w-4 text-green-600" />,
        error: <XCircle className="h-4 w-4 text-red-600" />,
        info: <Info className="h-4 w-4 text-blue-600" />,
        warning: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
        loading: <Loader2 className="h-4 w-4 animate-spin" />,
      }}
    />
  );
}
