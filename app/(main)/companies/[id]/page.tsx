import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RatingStars from "@/components/RatingStar";
import Link from "next/link";

interface CompanyPageProps {
  params: {
    id: string;
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const company = await prisma.company.findUnique({
    where: { id: params.id },
    include: {
      reviews: {
        include: {
          reviewer: true,
          employee: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      employees: {
        include: {
          employee: {
            include: {
              user: true,
              reviews: true,
            },
          },
        },
      },
    },
  });

  if (!company) {
    return notFound();
  }

  const averageRating =
    company.reviews.reduce((acc, review) => acc + review.rating, 0) /
    (company.reviews.length || 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Company Header */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {company.logo && (
              <div className="flex-shrink-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {company.name}
              </h1>
              <div className="mt-2 flex items-center">
                <RatingStars rating={averageRating} />
                <span className="ml-2 text-gray-600">
                  {averageRating.toFixed(1)} ({company.reviews.length} reviews)
                </span>
              </div>
              {company.website && (
                <div className="mt-2">
                  <Link
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {company.website}
                  </Link>
                </div>
              )}
              <div className="mt-4">
                <h3 className="font-medium text-gray-900">About</h3>
                <p className="text-gray-600 mt-1">
                  {company.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Employees Section */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Caregivers ({company.employees.length})
          </h2>
          {company.employees.length === 0 ? (
            <p className="text-gray-600">No caregivers listed.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.employees.map(({ employee }) => {
                if (!employee) return null;

                const avgRating =
                  employee.reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0
                  ) / (employee.reviews.length || 1);

                return (
                  <Link
                    key={employee.id}
                    href={`/caregivers/${employee.id}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <img
                        src={employee.user.imageUrl || "/default-avatar.png"}
                        alt={`${employee.user.firstName} ${employee.user.lastName}`}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium">
                          {employee.user.firstName} {employee.user.lastName}
                        </h3>
                        <div className="flex items-center mt-1">
                          <RatingStars rating={avgRating} size="sm" />
                          <span className="ml-2 text-sm text-gray-600">
                            ({employee.reviews.length})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      {employee.skills?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mr-1 mb-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
          {company.reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {company.reviews.map((review) => (
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
                    {review.employee && (
                      <Link
                        href={`/caregivers/${review.employee.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {review.employee.user.firstName}{" "}
                        {review.employee.user.lastName}
                      </Link>
                    )}
                  </div>
                  <h3 className="mt-3 font-medium">{review.title}</h3>
                  <p className="mt-1 text-gray-600">{review.content}</p>
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-4 border-blue-200 bg-blue-50 p-3 rounded">
                      <p className="font-medium text-gray-900">
                        Company Response:
                      </p>
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
