"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function _createCategory(data: any) {
  await prisma.categories.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  revalidatePath("/[categoryName]");
}
