<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<style>
  main {
    width: 1000px;
    height: 1000px;
    margin: 100px auto;
  }
</style>

<main>
  <Router {routes} />
</main>
