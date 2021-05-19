<script lang="ts">
  import { of, BehaviorSubject } from "rxjs";
  import { delay, startWith, scan, tap } from "rxjs/operators";

  // 여기서 delay는 값 평가를 늦춤
  const values = of([1, 2, 3, 4, 5]).pipe(delay(2000), startWith([]));

  const counter = new BehaviorSubject(0).pipe(
    // reduce같은 친구
    scan((acc, value) => {
      return acc + value;
    }),
    tap(console.log)
  );
</script>

<style lang="scss">
</style>

<div>RxJS 실험실!!</div>
<ul>
  {#each $values as v}
    <li>{v}</li>
  {/each}
</ul>

<h3>{$counter}</h3>
