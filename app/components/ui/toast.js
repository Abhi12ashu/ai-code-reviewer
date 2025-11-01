// app/components/ui/toast.js
"use client";

import { useEffect } from "react";
import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
        success: {
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        },
      }}
    />
  );
}
