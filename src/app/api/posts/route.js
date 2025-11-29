import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    // MongoDB ObjectId'yi stringe çevirerek client için normalize et
    const normalized = posts.map((post) => ({
      ...post,
      id: post.id.toString(),
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, platform, status, scheduledAt, description, imageUrl } =
      data ?? {};

    if (!title || !platform || !status) {
      return NextResponse.json(
        { message: "title, platform and status are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        platform,
        status,
        description: description || null,
        imageUrl: imageUrl || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    });

    return NextResponse.json(
      {
        ...post,
        id: post.id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
