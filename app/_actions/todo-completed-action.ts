"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function _todoCompletedAction(id: number, completed: boolean) {
  await prisma.todos.update({
    where: { id },
    data: {
      completed,
      updatedAt: new Date(),
    },
  });
  revalidatePath("/[categoryName]");
}
