<script lang="ts">
  import type { Todo } from "./todo.type";
  import TodoList from "~/components/TodoList/index.svelte";

  let todos: Todo[] = [
    { id: 0, isChecked: false, text: "finish Svelte tutorial" },
    { id: 1, isChecked: false, text: "build an app" },
    { id: 2, isChecked: false, text: "world domination" },
  ];

  const createTodo = (newTodo: Todo) => {
    todos = todos.concat([newTodo]);
  };

  const removeTodo = (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  };

  const editTodo = (id: number, text: string) => {
    const newTodo = [...todos];
    newTodo.find((todo) => todo.id === id).text = text;
    todos = newTodo;
  };
</script>

<style>
  main {
    width: 1000px;
    height: 1000px;
    margin: 100px auto;
  }
</style>

<main>
  <TodoList {todos} {createTodo} {removeTodo} {editTodo} />
</main>
