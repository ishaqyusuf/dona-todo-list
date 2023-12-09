"use server";

import { prisma } from "@/db";
import { ITodo } from "@/types";
import { Prisma, Todos } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function _getTodos(categoryName: string) {
  //Home, Completed, Today
  const where: Prisma.TodosWhereInput = {
    deletedAt: null,
  };
  switch (categoryName) {
    case "Home":
      where.OR = [{ completed: false }, { completed: null }];
      //   {
      //     not: true,
      //   };
      break;
    case "Completed":
      where.completed = true;
      break;
    case "Today":
      where.dueDate = {
        // gt: (new Date()).
      };
      break;
    default:
      where.category = {
        title: categoryName,
      };
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
