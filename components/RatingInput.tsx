"use client";

import { StarIcon } from "@heroicons/react/24/solid";

interface RatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
}

export default function RatingInput({ rating, setRating }: RatingInputProps) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="focus:outline-none"
        >
          <StarIcon
            className={`h-8 w-8 ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        {rating === 0
          ? "Select a rating"
          : `${rating} star${rating !== 1 ? "s" : ""}`}
      </span>
    </div>
  );
}
