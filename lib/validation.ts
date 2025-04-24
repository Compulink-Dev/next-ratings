import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5).max(100),
  content: z.string().min(10).max(1000),
  employeeId: z.string(),
  companyId: z.string().optional(),
});

export const caregiverSchema = z.object({
  bio: z.string().min(10).max(1000),
  skills: z.array(z.string()).min(1),
  experience: z.number().min(0),
  certifications: z.array(z.string()).optional(),
  hourlyRate: z.number().min(0).optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CaregiverFormData = z.infer<typeof caregiverSchema>;