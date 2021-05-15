<script lang="ts">
  import type { Todo } from "~/todo.type";

  export let todos: Todo[];
  export let removeTodo: (id: number) => void;
  export let editTodo: (id: number, text: string) => void;
</script>

<style>
</style>

<section class="todo-list__list">
  <div>투두리스트</div>
</section>
