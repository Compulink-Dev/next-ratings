import { User, Company, Review, Employee } from '@prisma/client';

export type CompanyWithRelations = Company & {
  reviews: (Review & {
    reviewer: User;
    employee: Employee & {
      user: User;
    };
  })[];
  employees: (User & {
    employee: Employee & {
      reviews: Review[];
      user: User;
    };
  })[];
};

export type EmployeeWithReviews = Employee & {
  user: User;
  reviews: (Review & {
    reviewer: User;
    company: Company | null;
  })[];
};