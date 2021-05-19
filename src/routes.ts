import TodoList from "~/pages/TodoList/index.svelte";
import MovieApp from "~/pages/MovieApp/index.svelte";
import Rx from "~/pages/Rx/index.svelte";

const routes = {
  "/": TodoList,
  "/movie": MovieApp,
  "/rx": Rx,
};

export default routes;
