<script lang="ts">
  export let createTodo: (text: string) => void;

  let inputValue = "";

  const createTodoAndResetInput = (text: string) => {
    createTodo(text);
    inputValue = "";
  };
</script>

<style lang="scss">
  .todo-input {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid black;
    input {
      width: 70%;
    }
    button {
      font-weight: 500;
      border: 1px solid black;
      padding: 0px 16px;
      cursor: pointer;
      transition: 0.2s;

      background-color: white;
      color: black;
      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
</style>

<section class="todo-input">
  <input
    type="text"
    placeholder="할 일을 입력해 주세여"
    bind:value={inputValue}
  />
  <button on:click={() => createTodoAndResetInput(inputValue)}>등록하기</button>
</section>
