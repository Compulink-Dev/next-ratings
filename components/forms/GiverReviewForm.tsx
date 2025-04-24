"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingInput from "@/components/RatingInput";

interface ReviewFormProps {
  employeeId: string;
  companyId?: string;
  reviewerId: string;
}

export default function ReviewForm({
  employeeId,
  companyId,
  reviewerId,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          title,
          content,
          employeeId,
          companyId,
          reviewerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      router.refresh();
      setRating(0);
      setTitle("");
      setContent("");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-lg font-medium text-gray-900">Write a Review</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <RatingInput rating={rating} setRating={setRating} />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Your Experience
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
