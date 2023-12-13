"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { UseFormReturn } from "react-hook-form";
import { ITodo } from "@/types";
import { useState } from "react";
export function DueDatePicker({ form }: { form: UseFormReturn<ITodo> }) {
  //   const [date, setDate] = React.useState<Date>(value);
  const [open, setOpen] = useState(false);
  const date = form.watch("dueDate");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "p-2 h-8 justify-start text-left font-normal relative",
            !date && "text-muted-foreground"
          )}
        >
          {date && (
            <div className="w-1.5 h-1.5 rounded-full absolute -right-1 -top-0 bg-blue-600" />
          )}
          <CalendarIcon className="h-4 w-4" />
          {/* {date ? dayjs(date).format("") : <span>Pick a date</span>} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date as any}
          onSelect={(e) => {
            form.setValue("dueDate", e as any);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
