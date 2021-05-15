<script lang="ts">
  import type { Todo } from "~/todo.type";
  import TodoInput from "./TodoInput.svelte";
  import TodoList from "./TodoList.svelte";

  export let todos: Todo[];
  export let createTodo: (text: string) => void;
  export let removeTodo: (id: number) => void;
  export let editTodo: (id: number, text: string) => void;
</script>

<style lang="scss">
  .todo-list__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .todo-list {
      border: 1px solid black;
      -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.13);
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.13);
      &__title {
        width: 500px;
        background-color: var(--color-primary);
        color: var(--color-secondary);
        font-weight: var(--font-bold);
        font-size: var(--font-title);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
      }
    }
  }
</style>

<section class="todo-list__wrapper">
  <div class="todo-list">
    <div class="todo-list__title">Todo List</div>
    <TodoInput {createTodo} />
    <TodoList {todos} {removeTodo} {editTodo} />
  </div>
</section>
