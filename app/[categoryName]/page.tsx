import SideBar from "@/components/SideBar";
import TodoList from "@/components/TodoList";
import { Metadata } from "next";
import { _getTodos } from "../_actions/todo.crud";

export const metadata: Metadata = {
  title: "Home",
};
interface Props {
  searchParams: any;
  params: any;
}
export default async function TodoPage({
  searchParams,
  params: { categoryName },
}: Props) {
  //   console.log(searchParams);
  //   const { categoryId } = searchParams;
  const todos = await _getTodos(categoryName);
  console.log(todos);
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar currentCategory={categoryName} />
      <TodoList todos={todos as any} />
    </div>
  );
}
