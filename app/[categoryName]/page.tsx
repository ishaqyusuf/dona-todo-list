import SideBar from "@/components/SideBar";
import TodoList from "@/components/TodoList";
import { Metadata } from "next";
import { _getTodos } from "../_actions/todo.crud";
import { prisma } from "@/db";
import { decode } from "querystring";

export const metadata: Metadata = {
  title: "Home",
};
interface Props {
  searchParams: any;
  params: any;
}
export default async function TodoPage({
  searchParams,
  params,
}: // params: { categoryName },
Props) {
  const categoryName = decodeURI(params.categoryName)?.toLowerCase();
  // console.log(categoryName);
  //   console.log(searchParams);
  //   const { categoryId } = searchParams;
  const todos = await _getTodos(categoryName);
  // console.log(todos);
  const categories = await prisma.categories.findMany({
    include: {
      _count: {
        select: {
          todos: {
            where: {
              OR: [{ completed: false }, { completed: null }],
            },
          },
        },
      },
    },
  });
  const completed = await prisma.todos.count({
    where: {
      completed: true,
    },
  });
  // categories.unshift({
  //   title: 'Completed',
  //   _count: {todos: completed}
  // })
  console.log({ completed });
  // categories[0]._count.todos
  // console.log;
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar categories={categories} currentCategory={categoryName} />
      {/* <ShieldOff/> */}
      <TodoList categories={categories} todos={todos as any} />
    </div>
  );
}
