"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { _getTodos } from "@/app/_actions/todo.crud";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Categories } from "@prisma/client";
import { _createCategory } from "@/app/_actions/categories.crud";
import CategoryIcon from "./category-icon";
import { ICategory } from "@/types";

interface Props {
  currentCategory: string;
  categories: ICategory[];
}
export default function SideBar({ currentCategory, categories }: Props) {
  const defaultCategories = [
    { title: "Home", Icon: Icons.home },
    { title: "Completed", Icon: Icons.completed },
    { title: "Today", Icon: Icons.today },
  ];
  return (
    <div className="h-full p-3 w-1/3">
      <aside className="border-2 rounded flex flex-col space-y-1 h-full p-8">
        {defaultCategories.map((props, index) => (
          <CategoryNavItem
            currentCategory={currentCategory}
            key={index}
            {...props}
          />
        ))}
        {categories.map((category, index) => (
          <CategoryNavItem
            todoCount={category._count.todos}
            currentCategory={currentCategory}
            key={index}
            {...(category as any)}
          />
        ))}
        <NewTodoCategoryForm />
      </aside>
    </div>
  );
}
function NewTodoCategoryForm({}) {
  const form = useForm({
    defaultValues: {
      title: "",
      color: "",
    },
  });
  async function saveCategory() {
    const data = form.getValues();
    await _createCategory(data);
    form.reset({
      color: "yellow-600",
    });
  }
  const color = form.watch("color");
  const [open, setOpen] = useState(false);
  return (
    <div className="inline-flex space-x-2 items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-2 shadow p-2 rounded-lg">
            <div
              className={cn("w-3 h-3 border-2 rounded", `border-${color}`)}
            ></div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid gap-2 grid-cols-8">
            {colors.map((c, i) => (
              <button
                onClick={() => {
                  form.setValue("color", c);
                  setOpen(false);
                }}
                className="p-2 hover:border-gray-400 border-2 rounded-md border-transparent"
                key={i}
              >
                <div className={cn(`bg-${c} w-4 h-4 rounded `)}></div>
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            // console.log("..");
            saveCategory();
          }
        }}
        className="border-none h-6 w-36 focus:outline-none focus:border-transparent"
        {...form.register("title")}
        placeholder="Create a new list"
      />
    </div>
  );
}
function CategoryNavItem({
  title,
  color,
  Icon,
  currentCategory,
  todoCount,
}: {
  title: string;
  Icon?: any;
  color?: string;
  currentCategory: string;
  todoCount?: number;
}) {
  // _getTodos()
  return (
    <Button
      asChild
      variant={
        title?.toLowerCase() == currentCategory?.toLowerCase()
          ? "secondary"
          : "ghost"
      }
    >
      <Link href={`/${title}`} className="">
        <div className="flex-1 flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          {color && <CategoryIcon color={color} />}
          <p className="font-semibold text-muted-foreground">{title}</p>
          <div className="flex-1" />
          <div>{todoCount || 0}</div>
        </div>
      </Link>
    </Button>
  );
}
const colors = [
  "blue-800",
  "blue-600",
  "sky-600",
  "sky-400",
  "green-600",
  "yellow-600",
  "yellow-300",
  "red-400",
  "red-600",
  "red-800",
  "pink-800",
  "pink-300",
  "purple-300",
  "purple-800",
  "gray-300",
  "gray-600",
];
