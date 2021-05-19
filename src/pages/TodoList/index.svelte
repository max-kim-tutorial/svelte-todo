<script lang="ts">
  import type { Todo } from "~/todo.type";
  import TodoInput from "../../components/TodoList/TodoInput.svelte";
  import TodoList from "../../components/TodoList/TodoList.svelte";

  let todos: Todo[] = [
    { id: 0, isChecked: false, text: "finish Svelte tutorial" },
    { id: 1, isChecked: false, text: "build an app" },
    { id: 2, isChecked: false, text: "world domination" },
  ];

  const createTodo = (text: string) => {
    const newId = todos.length;
    todos = todos.concat([{ id: newId, isChecked: false, text }]);
  };

  const removeTodo = (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  };

  const editTodo = (id: number, text: string) => {
    const newTodo = [...todos];
    newTodo.find((todo) => todo.id === id).text = text;
    todos = newTodo;
  };

  const toggleTodo = (id: number) => {
    const newTodo = [...todos];
    const selectedTodo = newTodo.find((todo) => todo.id === id);
    selectedTodo.isChecked = !selectedTodo.isChecked;
    todos = newTodo;
    console.log(todos);
  };
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
    <TodoList {todos} {removeTodo} {editTodo} {toggleTodo} />
  </div>
</section>
