import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export default function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon
          key={`full-${i}`}
          className={`${sizeClasses[size]} text-yellow-500`}
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <StarOutlineIcon className={`${sizeClasses[size]} text-yellow-500`} />
          <StarIcon
            className={`${sizeClasses[size]} text-yellow-500 absolute top-0 left-0 w-1/2 overflow-hidden`}
          />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutlineIcon
          key={`empty-${i}`}
          className={`${sizeClasses[size]} text-yellow-500`}
        />
      ))}
    </div>
  );
}
