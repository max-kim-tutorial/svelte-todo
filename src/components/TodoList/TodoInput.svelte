<script lang="ts">
  import type { Todo } from "~/todo.type";
  import Textfield from "@smui/textfield";

  export let createTodo: (newTodo: Todo) => void;
</script>

<style lang="scss">
</style>

<section class="todo-input">
  <Textfield />
  <div>투두인풋</div>
</section>
