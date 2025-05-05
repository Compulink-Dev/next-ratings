// app/actions/user.actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function createUser(data: {
  clerkUserId: string
  firstName: string
  lastName: string
  email: string
  role?: Role
  imageUrl?: string
  companyId?: string
}) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkUserId: data.clerkUserId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role || 'USER',
        imageUrl: data.imageUrl,
        companyId: data.companyId
      }
    })
    revalidatePath('/users')
    return user
  } catch (error) {
    throw new Error(`Failed to create user: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        company: true,
        employee: true,
        reviews: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getUserByClerkId(clerkUserId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        company: true,
        employee: true,
        reviews: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function updateUser(id: string, data: {
  firstName?: string
  lastName?: string
  email?: string
  role?: Role
  imageUrl?: string
  companyId?: string | null
}) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        imageUrl: data.imageUrl,
        companyId: data.companyId
      }
    })
    revalidatePath('/users')
    revalidatePath(`/users/${id}`)
    return updatedUser
  } catch (error) {
    throw new Error(`Failed to update user: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    revalidatePath('/users')
  } catch (error) {
    throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      include: {
        company: true,
        employee: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : String(error)}`)
  }
}