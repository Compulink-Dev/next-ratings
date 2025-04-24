"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
}

export function Rating({
  value,
  onChange,
  readOnly = false,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={cn("p-1", readOnly ? "cursor-default" : "cursor-pointer")}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHoverValue(star)}
          onMouseLeave={() => !readOnly && setHoverValue(null)}
          disabled={readOnly}
        >
          <Star
            className={cn(
              "h-6 w-6",
              (hoverValue || value) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
