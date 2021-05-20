<script lang="ts">
  import { movieStore } from "~/store";
</script>

<style lang="scss">
</style>

{#await movieStore.getMovie()}
  <p>...waiting</p>
{:then}
  <p>{$movieStore.data}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
