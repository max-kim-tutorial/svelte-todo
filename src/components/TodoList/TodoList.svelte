<script lang="ts">
  import type { Todo } from "~/todo.type";
  import TodoEntity from "./TodoEntity.svelte";

  export let todos: Todo[];
  export let removeTodo: (id: number) => void;
  export let editTodo: (id: number, text: string) => void;
  export let toggleTodo: (id: number) => void;
</script>

<style lang="scss">
</style>

<section class="todo-list">
  {#each todos as todo (todo.id)}
    <TodoEntity {todo} {editTodo} {removeTodo} {toggleTodo} />
  {/each}
</section>
