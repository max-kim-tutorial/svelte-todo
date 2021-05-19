import TodoList from "~/pages/TodoList/index.svelte";
import MovieApp from "~/pages/MovieApp/index.svelte";

const routes = {
  "/": TodoList,
  "/movie": MovieApp,
};

export default routes;
