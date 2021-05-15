<script lang="ts">
  import type { Todo } from "~/todo.type";
  import { afterUpdate } from "svelte";

  export let todo: Todo;
  export let editTodo: (id: number, text: string) => void;
  export let removeTodo: (id: number) => void;
  export let toggleTodo: (id: number) => void;

  let isEditMode: boolean = false;
  let inputValue: string = todo.text;

  const updateTodo = (id: number, text: string) => {
    editTodo(id, text);
    isEditMode = false;
  };

  const changeEditMode = () => {
    isEditMode = true;
  };

  afterUpdate(async () => {
    const inputElement = document.querySelector(
      "input.todo-entity__edit-input"
    );

    if (inputElement) {
      (inputElement as HTMLInputElement).focus();
    }
  });
</script>

<style lang="scss">
  .todo-entity {
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    margin: 16px;
    padding: 8px;
    cursor: pointer;
    .box {
      width: 15px;
      height: 15px;
      border-radius: 20px;
      border: 1px solid black;
    }
    &__left {
      display: flex;
      justify-content: space-between;
    }
    &__box--check {
      @extend .box;
      background-color: black;
    }
    &__box--uncheck {
      @extend .box;
      background-color: white;
    }
    &__text,
    &__edit-input {
      margin-left: 8px;
      height: 12px;
    }
    &__sub-text {
      font-size: 8px;
      margin-left: 8px;
    }
  }
</style>

<div class="todo-entity">
  <div class="todo-entity__left">
    <div
      on:click={() => toggleTodo(todo.id)}
      class:todo-entity__box--check={todo.isChecked}
      class:todo-entity__box--uncheck={!todo.isChecked}
    />
    {#if isEditMode}
      <input
        class="todo-entity__edit-input"
        type="text"
        bind:value={inputValue}
        on:keydown={(e) => e.key === "Enter" && updateTodo(todo.id, inputValue)}
      />
      <div
        class="todo-entity__sub-text"
        on:click={() => updateTodo(todo.id, inputValue)}
      >
        확인
      </div>
    {:else}
      <div class="todo-entity__text" on:click={changeEditMode}>
        {todo.text}
      </div>
    {/if}
  </div>
  <div class="todo-entity__delete" on:click={() => removeTodo(todo.id)}>X</div>
</div>
