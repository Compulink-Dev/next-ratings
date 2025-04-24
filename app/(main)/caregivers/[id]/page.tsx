import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RatingStars from "@/components/RatingStar";
import Link from "next/link";

interface CaregiverPageProps {
  params: {
    id: string;
  };
}

interface ReviewWithRelations {
  id: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  response: string | null;
  reviewer: {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl: string | null;
  };
  company: {
    id: string;
    name: string;
  } | null;
}

interface CaregiverWithRelations {
  id: string;
  bio: string | null;
  skills: string[];
  experience: number | null;
  certifications: string[];
  hourlyRate: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl: string | null;
    company: {
      id: string;
      name: string;
    } | null;
  };
  reviews: ReviewWithRelations[];
}

export default async function CaregiverPage({ params }: CaregiverPageProps) {
  const caregiver = (await prisma.employee.findUnique({
    where: { id: params.id },
    include: {
      user: {
        include: {
          company: true,
        },
      },
      reviews: {
        include: {
          reviewer: true,
          company: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })) as CaregiverWithRelations | null;

  if (!caregiver) {
    return notFound();
  }

  const averageRating =
    caregiver.reviews.reduce(
      (acc: number, review: { rating: number }) => acc + review.rating,
      0
    ) / (caregiver.reviews.length || 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Caregiver Header */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={caregiver.user.imageUrl || "/default-avatar.png"}
                alt={`${caregiver.user.firstName} ${caregiver.user.lastName}`}
                className="h-32 w-32 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {caregiver.user.firstName} {caregiver.user.lastName}
              </h1>
              <div className="mt-2 flex items-center">
                <RatingStars rating={averageRating} />
                <span className="ml-2 text-gray-600">
                  {averageRating.toFixed(1)} ({caregiver.reviews.length}{" "}
                  reviews)
                </span>
              </div>
              {caregiver.user.company && (
                <div className="mt-2">
                  <span className="text-gray-600">Works at: </span>
                  <Link
                    href={`/companies/${caregiver.user.company.id}`}
                    className="text-blue-600"
                  >
                    {caregiver.user.company.name}
                  </Link>
                </div>
              )}
              <div className="mt-4">
                <h3 className="font-medium text-gray-900">About</h3>
                <p className="text-gray-600 mt-1">
                  {caregiver.bio || "No bio provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Details */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {caregiver.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Experience</h3>
              <p className="mt-2 text-gray-600">
                {caregiver.experience
                  ? `${caregiver.experience} years`
                  : "Not specified"}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Hourly Rate</h3>
              <p className="mt-2 text-gray-600">
                {caregiver.hourlyRate
                  ? `$${caregiver.hourlyRate.toFixed(2)}/hr`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
          {caregiver.reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {caregiver.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={review.reviewer.imageUrl || "/default-avatar.png"}
                        alt={`${review.reviewer.firstName} ${review.reviewer.lastName}`}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-medium">
                          {review.reviewer.firstName} {review.reviewer.lastName}
                        </p>
                        <div className="flex items-center">
                          <RatingStars rating={review.rating} />
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {review.company && (
                      <Link
                        href={`/companies/${review.company.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {review.company.name}
                      </Link>
                    )}
                  </div>
                  <h3 className="mt-3 font-medium">{review.title}</h3>
                  <p className="mt-1 text-gray-600">{review.content}</p>
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-4 border-blue-200 bg-blue-50 p-3 rounded">
                      <p className="font-medium text-gray-900">Response:</p>
                      <p className="text-gray-600">{review.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
