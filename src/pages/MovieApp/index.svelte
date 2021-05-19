<script lang="ts">
  import { getMovies } from "~/core/api";

  const movies = getMovies();
</script>

<style lang="scss">
</style>

{#await movies}
  <p>...waiting</p>
{:then data}
  <p>{data}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
