"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";
import { ITodo } from "@/types";
import { _createTodo } from "@/app/_actions/todo.crud";
export default function TodoInputForm({}) {
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
    <div>
      <Input
        className=""
        {...form.register("task")}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            // console.log("..");
            saveTodo();
          }
        }}
      />
    </div>
  );
}
