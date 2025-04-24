'use server';
import prisma from '@/lib/prisma';

export const createEmployee = async (data: {
  userId: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  certifications?: string[];
  hourlyRate?: number;
}) => {
  return await prisma.employee.create({ data });
};

export const getEmployeeById = async (id: string) => {
  return await prisma.employee.findUnique({ where: { id } });
};

export const updateEmployee = async (id: string, data: Partial<{
  bio: string;
  skills: string[];
  experience: number;
  certifications: string[];
  hourlyRate: number;
}>) => {
  return await prisma.employee.update({ where: { id }, data });
};

export const deleteEmployee = async (id: string) => {
  return await prisma.employee.delete({ where: { id } });
};
