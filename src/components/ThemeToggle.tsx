import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // init dark
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark((d) => !d)}
      className="rounded-full"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
