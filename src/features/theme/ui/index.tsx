"use client";

import { Button } from "@/shared/ui/Button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeControl() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme;

  return (
    <div className="absolute w-[45]! h-[40] right-5 top-5">
      <Button
        variant={"outline"}
        className={`h-full cursor-pointer`}
        name="input-field-username"
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        type="button"
      >
        {currentTheme === "dark" ? (
          <Sun size={32} strokeWidth={2.5} />
        ) : (
          <Moon size={32} strokeWidth={2.5} />
        )}
      </Button>
    </div>
  );
}
