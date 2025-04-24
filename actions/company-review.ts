'use server';
import prisma from '@/lib/prisma';

export const createCompany = async (data: {
  name: string;
  description?: string;
  website?: string;
  logo?: string;
}) => {
  return await prisma.company.create({ data });
};

export const getCompanyById = async (id: string) => {
  return await prisma.company.findUnique({ where: { id } });
};

export const updateCompany = async (id: string, data: Partial<{
  name: string;
  description: string;
  website: string;
  logo: string;
}>) => {
  return await prisma.company.update({ where: { id }, data });
};

export const deleteCompany = async (id: string) => {
  return await prisma.company.delete({ where: { id } });
};
