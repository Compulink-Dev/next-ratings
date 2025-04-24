import { type EmployeeWithReviews } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/Rating";

interface EmployeeProfileProps {
  employee: EmployeeWithReviews;
}

export function CaregiverProfile({ employee }: EmployeeProfileProps) {
  const averageRating =
    employee.reviews.reduce((sum: any, review: any) => sum + review.rating, 0) /
    employee.reviews.length;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Avatar className="h-32 w-32">
        <AvatarImage src={employee.user.imageUrl || "/holder.png"} />
        <AvatarFallback>
          {employee.user.firstName.charAt(0)}
          {employee.user.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <h1 className="text-3xl font-bold">
          {employee.user.firstName} {employee.user.lastName}
        </h1>

        {employee.user.companyId && (
          <p className="text-gray-600 mt-1">
            Works at company ID: {employee.user.companyId}
          </p>
        )}

        <div className="flex items-center mt-2">
          <Rating value={Math.round(averageRating)} readOnly />
          <span className="ml-2 text-gray-700">
            {averageRating.toFixed(1)} ({employee.reviews.length} reviews)
          </span>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-gray-700">{employee.bio}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {employee.skills.map((skill: any) => (
                <span
                  key={skill}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {employee.experience && (
            <div>
              <h3 className="font-medium">Experience</h3>
              <p className="mt-2 text-gray-700">{employee.experience} years</p>
            </div>
          )}

          {employee.certifications?.length > 0 && (
            <div>
              <h3 className="font-medium">Certifications</h3>
              <ul className="mt-2 list-disc list-inside">
                {employee.certifications.map((cert: any) => (
                  <li key={cert} className="text-gray-700">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {employee.hourlyRate && (
            <div>
              <h3 className="font-medium">Hourly Rate</h3>
              <p className="mt-2 text-gray-700">
                ${employee.hourlyRate.toFixed(2)}/hour
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
