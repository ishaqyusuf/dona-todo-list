"use client";

import { ITodo } from "@/types";
import { UseFormReturn } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CategoryIcon from "./category-icon";
import { Categories } from "@prisma/client";
import { CatIcon, Check, ChevronDown } from "lucide-react";

export default function CategoryPicker({
  form,
  categories,
}: {
  categories: Categories[];
  form: UseFormReturn<ITodo>;
}) {
  const color = form.watch("category.color");
  const title = form.watch("category.title");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="h-8 space-x-2" variant={"secondary"}>
            <CategoryIcon color={color || "gray"} />
            <p className="font-semibold text-muted-foreground">
              {title || "No List"}
            </p>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[...categories, { title: "No list" } as any].map((c) => (
            <DropdownMenuItem
              onClick={() => {
                form.setValue("category.title", c.title);
                form.setValue("category.id", c.id);
                form.setValue("category.color", c.color);
                // form.setValue("category", { ...c });
                // form.setValue('')
              }}
              key={c.id}
            >
              <div className="inline-flex space-x-2 items-center">
                <CategoryIcon color={c.color || "gray"} />
                <span className="">{c.title}</span>
                {c.title == title && <Check className="w-4 h-4" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
