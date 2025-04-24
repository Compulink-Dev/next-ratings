'use server';
import prisma from '@/lib/prisma';

export const createUser = async (data: {
  clerkUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  role?: 'USER' | 'COMPANY_ADMIN' | 'PLATFORM_ADMIN';
  companyId?: string;
}) => {
  return await prisma.user.create({ data });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: string, data: Partial<{
  firstName: string;
  lastName: string;
  imageUrl: string;
  companyId: string;
}>) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};
