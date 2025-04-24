import { type ReviewWithRelations } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/Rating";

interface ReviewListProps {
  reviews: ReviewWithRelations[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={review.reviewer.imageUrl || "/holder.png"} />
              <AvatarFallback>
                {review.reviewer.firstName?.charAt(0)}
                {review.reviewer.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {review.reviewer.firstName} {review.reviewer.lastName}
              </p>
              <div className="flex items-center">
                <Rating value={review.rating} readOnly />
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{review.title}</h3>
          <p className="mt-1 text-gray-700">{review.content}</p>
          {review.response && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200">
              <p className="font-medium">Response from caregiver:</p>
              <p className="text-gray-700">{review.response}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
