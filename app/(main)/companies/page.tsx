import { prisma } from "@/lib/prisma";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import RatingStars from "@/components/RatingStar";

interface CompaniesPageProps {
  searchParams: {
    page?: string;
    search?: string;
    minRating?: string;
  };
}

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const whereConditions: any = {};

  if (searchParams.search) {
    whereConditions.name = {
      contains: searchParams.search,
      mode: "insensitive",
    };
  }

  if (searchParams.minRating) {
    whereConditions.reviews = {
      some: {
        rating: { gte: parseInt(searchParams.minRating) },
      },
    };
  }

  const [companies, totalCompanies] = await Promise.all([
    prisma.company.findMany({
      where: whereConditions,
      include: {
        reviews: true,
        employees: {
          include: {
            employee: true,
          },
        },
      },
      skip,
      take: pageSize,
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
    }),
    prisma.company.count({
      where: whereConditions,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Caregiving Companies
        </h1>
        <p className="mt-2 text-gray-600">
          Browse and review professional caregiving companies
        </p>
      </div>

      <div className="mt-8">
        {companies.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No companies found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => {
              const avgRating =
                company.reviews.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / (company.reviews.length || 1);

              const employeeCount = company.employees.length;

              return (
                <div
                  key={company.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/companies/${company.id}`} className="block">
                    <div className="p-6">
                      <div className="flex items-center">
                        {company.logo && (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                        )}
                        <div className={company.logo ? "ml-4" : ""}>
                          <h3 className="font-medium">{company.name}</h3>
                          <div className="flex items-center mt-1">
                            <RatingStars rating={avgRating} size="sm" />
                            <span className="ml-2 text-sm text-gray-600">
                              ({company.reviews.length})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {company.description || "No description available."}
                        </p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {employeeCount} caregiver
                            {employeeCount !== 1 ? "s" : ""}
                          </span>
                          {company.website && (
                            <span className="text-sm text-blue-600">
                              Visit Website
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
        totalItems={totalCompanies}
        itemsPerPage={pageSize}
        className="mt-8"
      />
    </div>
  );
}
