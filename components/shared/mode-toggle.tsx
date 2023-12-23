"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { buttonVariants } from "../ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
          <Sun className="h-[1.2rem] w-[1.2rem rotate-0 transition-all scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="h-[1.2rem] w-[1.2rem] absolute rotate-90 scale-0 dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
