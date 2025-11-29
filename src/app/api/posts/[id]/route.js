import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(_request, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[POST_GET]", error);
    return NextResponse.json(
      { message: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const updated = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        platform,
        status,
        description: description || null,
        imageUrl: imageUrl || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[POST_PUT]", error);
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("[POST_DELETE]", error);
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
