"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ITodo } from "@/types";
import { _createTodo } from "@/app/_actions/todo.crud";
import { cn } from "@/lib/utils";
import { DueDatePicker } from "../date-picker";
import CategoryPicker from "../category-picker";
import { Categories } from "@prisma/client";
export default function TodoInputForm({
  categories,
}: {
  categories: Categories[];
}) {
  const form = useForm<ITodo>({
    defaultValues: {
      task: "",
      completed: false,
      dueDate: null,
      category: {},
    },
  });
  async function saveTodo() {
    const todo = await _createTodo(form.getValues());
    form.reset();

    //    todo.category
  }
  //   const cateDAte  =form.getValues('user.')
  //   cateDAte.
  //  const [title,date] = form.getValues(['title','date'])

  //   form.setValue('title','')
  //   // form.reset({});
  //   const title = form.watch("title");
  //   form.getValues('')
  //   let _title = "abc";
  return (
    <div className={cn("inline-flex")}>
      <Input
        className="border-none focus:outline-none focus:border-none"
        {...form.register("task")}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            // console.log("..");
            saveTodo();
          }
        }}
      />
      <DueDatePicker form={form} />
      <CategoryPicker form={form} categories={categories} />
    </div>
  );
}
