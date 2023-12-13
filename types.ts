import { Categories, Todos } from "@prisma/client";

export interface ITodo extends Todos {
  category: Categories;
}
export interface ICategory extends Categories {
  todos: Todos[];
  _count: {
    todos: number;
  };
}
