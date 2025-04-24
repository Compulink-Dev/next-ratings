import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data
    if (!data.rating || !data.title || !data.content || !data.employeeId || !data.reviewerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the reviewer has already reviewed this employee
    const existingReview = await prisma.review.findFirst({
      where: {
        employeeId: data.employeeId,
        reviewerId: data.reviewerId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this caregiver' },
        { status: 400 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        title: data.title,
        content: data.content,
        employeeId: data.employeeId,
        reviewerId: data.reviewerId,
        companyId: data.companyId || null,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}