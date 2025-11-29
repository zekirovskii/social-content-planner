import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import prisma from "@/lib/prisma";

export async function GET(_request, context) {
  try {
    const { id } = await context.params;
    const objectId = new ObjectId(id);

    const post = await prisma.post.findUnique({
      where: { id: objectId },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...post,
      id: post.id.toString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    const objectId = new ObjectId(id);

    const data = {
      ...body,
      scheduledAt:
        body.scheduledAt && body.scheduledAt.trim() !== ""
          ? new Date(body.scheduledAt)
          : null,
    };

    const updated = await prisma.post.update({
      where: { id: objectId },
      data,
    });

    return NextResponse.json({
      ...updated,
      id: updated.id.toString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_request, context) {
  try {
    const { id } = await context.params;
    const objectId = new ObjectId(id);

    await prisma.post.delete({
      where: { id: objectId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
