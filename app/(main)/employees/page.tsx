import { prisma } from "@/lib/prisma";
import SearchFilters from "@/components/SearchFilters";
import Pagination from "@/components/Pagination";
import RatingStars from "@/components/RatingStar";
import Link from "next/link";

interface CaregiversPageProps {
  searchParams: {
    page?: string;
    search?: string;
    specialty?: string;
    minRating?: string;
    company?: string;
  };
}

export default async function CaregiversPage({
  searchParams,
}: CaregiversPageProps) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const whereConditions: any = {
    user: {
      role: "USER", // Only show regular users who are caregivers
    },
  };

  if (searchParams.search) {
    whereConditions.user.OR = [
      { firstName: { contains: searchParams.search, mode: "insensitive" } },
      { lastName: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  if (searchParams.specialty) {
    whereConditions.skills = { has: searchParams.specialty };
  }

  if (searchParams.minRating) {
    whereConditions.reviews = {
      some: {
        rating: { gte: parseInt(searchParams.minRating) },
      },
    };
  }

  if (searchParams.company) {
    whereConditions.user.companyId = searchParams.company;
  }

  const [caregivers, totalCaregivers] = await Promise.all([
    prisma.employee.findMany({
      where: whereConditions,
      include: {
        user: true,
        reviews: true,
      },
      skip,
      take: pageSize,
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
    }),
    prisma.employee.count({
      where: whereConditions,
    }),
  ]);

  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const specialties = [
    "Elderly Care",
    "Special Needs",
    "Post-Surgery",
    "Child Care",
    "Dementia Care",
    "Palliative Care",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Caregivers</h1>
        <p className="mt-2 text-gray-600">
          Browse and review professional caregivers in your area
        </p>
      </div>

      <SearchFilters companies={companies} specialties={specialties} />

      <div className="mt-8">
        {caregivers.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No caregivers found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivers.map((caregiver) => {
              const avgRating =
                caregiver.reviews.reduce(
                  (acc: number, review: { rating: number }) =>
                    acc + review.rating,
                  0
                ) / (caregiver.reviews.length || 1);

              return (
                <div
                  key={caregiver.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/caregivers/${caregiver.id}`} className="block">
                    <div className="p-6">
                      <div className="flex items-center">
                        <img
                          src={caregiver.user.imageUrl || "/default-avatar.png"}
                          alt={`${caregiver.user.firstName} ${caregiver.user.lastName}`}
                          className="h-16 w-16 rounded-full"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium">
                            {caregiver.user.firstName} {caregiver.user.lastName}
                          </h3>
                          <div className="flex items-center mt-1">
                            <RatingStars rating={avgRating} size="sm" />
                            <span className="ml-2 text-sm text-gray-600">
                              ({caregiver.reviews.length})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          Skills
                        </h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {caregiver.skills
                            .slice(0, 3)
                            .map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          {caregiver.skills.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{caregiver.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalItems={totalCaregivers}
        itemsPerPage={pageSize}
        className="mt-8"
      />
    </div>
  );
}
