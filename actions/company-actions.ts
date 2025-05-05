// app/actions/employee.actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createEmployee(data: {
  userId: string
  bio?: string
  skills?: string[]
  experience?: number
  certifications?: string[]
  hourlyRate?: number
}) {
  try {
    const employee = await prisma.employee.create({
      data: {
        userId: data.userId,
        bio: data.bio,
        skills: data.skills || [],
        experience: data.experience,
        certifications: data.certifications || [],
        hourlyRate: data.hourlyRate
      }
    })
    revalidatePath('/employees')
    return employee
  } catch (error) {
    throw new Error(`Failed to create employee: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getEmployeeById(id: string) {
  try {
    return await prisma.employee.findUnique({
      where: { id },
      include: {
        user: true,
        reviews: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch employee: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getEmployeeByUserId(userId: string) {
  try {
    return await prisma.employee.findUnique({
      where: { userId },
      include: {
        user: true,
        reviews: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch employee: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function updateEmployee(id: string, data: {
  bio?: string | null
  skills?: string[]
  experience?: number | null
  certifications?: string[]
  hourlyRate?: number | null
}) {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        bio: data.bio,
        skills: data.skills,
        experience: data.experience,
        certifications: data.certifications,
        hourlyRate: data.hourlyRate
      }
    })
    revalidatePath('/employees')
    revalidatePath(`/employees/${id}`)
    return updatedEmployee
  } catch (error) {
    throw new Error(`Failed to update employee: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.delete({
      where: { id }
    })
    revalidatePath('/employees')
  } catch (error) {
    throw new Error(`Failed to delete employee: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getAllEmployees() {
  try {
    return await prisma.employee.findMany({
      include: {
        user: true,
        reviews: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch employees: ${error instanceof Error ? error.message : String(error)}`)
  }
}