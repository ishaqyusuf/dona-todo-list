import SideBar from "@/components/SideBar";
import TodoList from "@/components/TodoList";
import { Metadata } from "next";
import { _getTodos } from "../_actions/todo.crud";
import { prisma } from "@/db";

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
  const categoryName = params.categoryName;

  //   console.log(searchParams);
  //   const { categoryId } = searchParams;
  const todos = await _getTodos(categoryName);
  console.log(todos);
  const categories = await prisma.categories.findMany({});
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar categories={categories} currentCategory={categoryName} />
      {/* <ShieldOff/> */}
      <TodoList todos={todos as any} />
    </div>
  );
}
