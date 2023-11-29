import { ITodo } from "@/types";
import TodoInputForm from "./form/TodoInputForm";

interface Props {
  todos: ITodo[];
}
export default function TodoList({ todos }: Props) {
  return (
    <main>
      <TodoInputForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </main>
  );
}
