"use server";

import { prisma } from "@/db";
import { ITodo } from "@/types";
import { Prisma, Todos } from "@prisma/client";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export async function _getTodos(categoryName: string) {
  //Home, Completed, Today
  const where: Prisma.TodosWhereInput = {
    deletedAt: null,
  };
  console.log(categoryName);
  switch (categoryName) {
    case "home":
      where.OR = [{ completed: false }, { completed: null }];
      //   {
      //     not: true,
      //   };
      break;
    case "completed":
      where.completed = true;
      break;
    case "today":
      const gt = dayjs()
        .subtract(1, "day")
        .set("hours", 23)
        .set("minutes", 59)
        .set("seconds", 59)
        .toISOString();
      console.log(gt);
      where.dueDate = {
        gt,
        lt: dayjs()
          // .add(1, "day")
          .set("hours", 23)
          .set("minutes", 59)
          .set("seconds", 59)
          .toISOString(),
        // gt: (new Date()).
      };
      break;
    default:
      where.category = {
        title: categoryName,
      };
      where.OR = [{ completed: false }, { completed: null }];
  }
  const todos = await prisma.todos.findMany({
    where,
    include: {
      category: true,
    },
  });
  return todos;
}
export async function _createTodo(todo: ITodo) {
  // todo.
  // todo.category.
  const newTodo = await prisma.todos.create({
    data: {
      task: todo.task,
      dueDate: todo.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      // categoryId
      category: todo.category.title
        ? {
            connectOrCreate: {
              where: {
                title: todo.category.title,
              },
              create: {
                title: todo.category.title,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          }
        : undefined,
    },
    include: {
      category: true,
    },
  });
  revalidatePath("/[categoryName]");
  return newTodo;
}
export async function _todoRecycleBin() {
  const todos = await prisma.todos.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },
  });
}
