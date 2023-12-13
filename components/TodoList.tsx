"use client";
import { ITodo } from "@/types";
import TodoInputForm from "./form/TodoInputForm";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState, useEffect } from "react";
import { _todoCompletedAction } from "@/app/_actions/todo-completed-action";
import { Categories } from "@prisma/client";
import CategoryIcon from "./category-icon";

interface Props {
  todos: ITodo[];
  categories: Categories[];
}
export default function TodoList({ todos, categories }: Props) {
  return (
    <main>
      <TodoInputForm categories={categories} />
      <ul className="flex flex-col">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
function TodoItem({ todo }: { todo: ITodo }) {
  // let c : CheckedState = 'indeterminate'
  const [checked, setChecked] = useState<boolean>(todo.completed || false);
  const [focused, setFocused] = useState(false);
  // useEffect(() => {
  //   if (focused) {
  //     console.log(todo.id, checked);
  //   }
  // }, [checked, focused]);
  return (
    <li key={todo.id} className="inline-flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          // onFocus={(e) => setFocused(true)}
          onCheckedChange={async (e) => {
            // console.log(e);
            setChecked(e as any);
            setTimeout(async () => {
              await _todoCompletedAction(todo.id, e as any);
            }, 1000);
          }}
          id="terms"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {todo.task}
        </label>
        <div className="">
          {todo.categoryId && <CategoryIcon color={todo.category?.color} />}
        </div>
      </div>
    </li>
  );
}
