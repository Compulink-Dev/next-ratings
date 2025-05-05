// app/actions/review.actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createReview(data: {
  rating: number
  title: string
  content: string
  employeeId: string
  reviewerId: string
  companyId?: string
  response?: string
}) {
  try {
    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        title: data.title,
        content: data.content,
        employeeId: data.employeeId,
        reviewerId: data.reviewerId,
        companyId: data.companyId,
        response: data.response
      }
    })
    revalidatePath('/reviews')
    revalidatePath(`/employees/${data.employeeId}`)
    return review
  } catch (error) {
    throw new Error(`Failed to create review: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getReviewById(id: string) {
  try {
    return await prisma.review.findUnique({
      where: { id },
      include: {
        employee: true,
        reviewer: true,
        company: true
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch review: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function updateReview(id: string, data: {
  rating?: number
  title?: string
  content?: string
  response?: string | null
}) {
  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        rating: data.rating,
        title: data.title,
        content: data.content,
        response: data.response
      }
    })
    revalidatePath('/reviews')
    revalidatePath(`/reviews/${id}`)
    if (updatedReview.employeeId) {
      revalidatePath(`/employees/${updatedReview.employeeId}`)
    }
    return updatedReview
  } catch (error) {
    throw new Error(`Failed to update review: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function deleteReview(id: string) {
  try {
    const review = await prisma.review.findUnique({
      where: { id }
    })
    
    await prisma.review.delete({
      where: { id }
    })
    
    revalidatePath('/reviews')
    if (review?.employeeId) {
      revalidatePath(`/employees/${review.employeeId}`)
    }
  } catch (error) {
    throw new Error(`Failed to delete review: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getReviewsByEmployeeId(employeeId: string) {
  try {
    return await prisma.review.findMany({
      where: { employeeId },
      include: {
        reviewer: true,
        company: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch reviews: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getReviewsByCompanyId(companyId: string) {
  try {
    return await prisma.review.findMany({
      where: { companyId },
      include: {
        reviewer: true,
        employee: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    throw new Error(`Failed to fetch reviews: ${error instanceof Error ? error.message : String(error)}`)
  }
}