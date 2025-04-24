import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CaregiverProfile } from "@/components/EmployeeProfile";
import { ReviewList } from "@/components/ReviewList";
import { ReviewForm } from "@/components/forms/ReviewForm";

export default async function CaregiverPage({
  params,
}: {
  params: { id: string };
}) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    include: {
      user: {
        include: {
          company: true, // Include the company on the user
        },
      },
      reviews: {
        include: {
          reviewer: true,
          company: true,
          employee: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!employee) {
    return notFound();
  }

  const { userId } = await auth();
  const hasReviewed = userId
    ? employee.reviews.some((review: any) => review.reviewerId === userId)
    : false;

  return (
    <div className="container mx-auto py-8">
      <CaregiverProfile employee={employee} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <ReviewList reviews={employee.reviews} />

        {userId && !hasReviewed && (
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <ReviewForm
              employeeId={employee.id}
              companyId={employee.user.companyId || undefined}
              onSubmit={async (data) => {
                "use server";
                await prisma.review.create({
                  data: {
                    ...data,
                    reviewerId: userId,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
