# Svelte TODO + MOVIE APP

Junction X 해커톤에서 써먹기 위한 Svelte 연습 + RXJS

## 할것

- [x] TODO 리스트 만들기
- [x] 라우팅
- [ ] 무비앱 만들기 + 비동기 요청 + RxJs 사용해보기
- [ ] Svelte Store 사용해보기
- [ ] 스니펫 만들기

## 특기할만한 사항

![ㄷㄷ해](./lesscode.png)

### 특징

- 스스로를 프레임워크가 없는 프레임워크, 컴파일러라고 소개
- 가상돔이 없고, 런타임에 로드할 프레임워크가 없음
- 빌드 단계에서 구성요소를 컴파일하는 도구. 페이지에 단일 번들을 사용할 수 있음
- write less code : 높은 가독성, 개발시간 단축, 쉬운 리팩토링, 쉬운 디버깅, **더 작은 번들**, 낮은 러닝 커브
- no virtual dom : 빠른 성능, diffing 안함, 오버헤드 없음
  - 런타임에서 리액트보다 **메모리를 3배를 덜쓴다.**
- Truly reactive : 찐 반응성
  - 런타임에서 프레임워크가 사용되지 않고, **바닐라 JS로 결과물을 컴파일해서 브라우저에 띄운다**
  - 반응성이 동작하는 방식 : 이벤트 핸들러가 state를 업데이트한다면, 이미 작성한 코드를 가지고 언제 반응성이 일어나는지 미리 예상하고, 그 결과물을 브라우저에서 만들어내는 방식으로 렌더링.
  - 순수한 자바스크립트가 브라우저에서 돌아간다.
  - dev dependency만 있으면 된다 == svelte가 svelte 코드를 바닐라 JS로 컴파일하고 그 결과만 동작시키기 때문에 svelte는 브라우저에서 동작하지 않는 컴파일러라고 할 수 있음
  - 명시적 설계 : 사용자가 직접 반응성을 만들어낸다
  - 변경된 값이 DOM에 자동으로 반영된다 : 그냥 데이터 값만 바꿔주면 바로 반영됨 리액트처럼 불변성을 신경써야 한다거나 할 필요가 없고 새롭게 **할당**만 시키면 된다
- 단점
  - 낮은 성숙도와 작은 생태계 : 문법 대격변 + 라이브러리 많이 없음
  - CDN 미제공 : 컴파일러기 때문에 어쩌면?
  - IE지원이 걍 없음 : 아예 안되는건 프로덕션 도입에는 문제가 있을수도?

### 특기할만한 사항

#### prop modify

```jsx
// prop modify

<script>
  import Fruits from "./Fruits.svelte";

  let fruits = ["Apple", "Banana", "Cherry", "Orange", "Mango"];
</script>

<Fruits {fruits} />
<Fruits {fruits} reverse />
<Fruits {fruits} slice="-2" />
<Fruits {fruits} slice="0, 3" />
```

#### 라이프 사이클

- onMount : 컴포넌트가 연결된 직후 콜백 실행
- onDestroy : 컴포넌트가 연결 해제되기 직전
- beforeUpdate : 컴포넌트의 데이터가 업데이트되기 직전
- afterUpdate : 컴포넌트의 데이터가 업데이트된 직후
- tick : 변경된 데이터가 화면에 반영될때까지 기다림
  - 데이터 변경 후 화면의 갱신까지 기다림(Vue에서의 nextTick)
  - 비동기로 실행
- 생긴건 그냥 함수기때문에 컴포넌트 외부에서 모듈화를 해도 됨

```js
<script>
  import { tick } from 'svelte'

  let name = 'world'

  async function handler() {
    name = 'Heropy'
    await tick()
    const h1 = document.querySelector('h1')
    console.log(h1.innerText) // Hello Heropy!
  }
</script>

<h1 on:click={handler}>Hello {name}!</h1>
```

#### 반응성

- svelte에서의 반응성 갱신은 할당 연산자를 사용. push나 splice같은건 안됨
- 기본형은 그냥 할당, 참조형은 modify해서 새로운 배열이나 객체를 할당

#### 반응성 구문

- $ : 순수한 자바스크립트 label 구문(반복문같은거 레이블링 하는 문법 - JS에도 있구나 이런게..) 데이터 변경이 아닌 반응성을 계측하는 것. 데이터의 변경이 즉각 반영되지 않음. (Vue의 computed) 한번만 초기화되는 prop같은 경우 tick없이 유용하게 사용할 수 있을듯?

```jsx
<script>
  let count = 0

  // 선언
  $: double = count * 2

  // 블록
  $: {
    console.log(count)
    console.log(double)
  }

  // 함수 실행
  $: count, log()

  // 즉시 실행 함수(IIFE)
  $: count, (() => {
    console.log('iife: Heropy')
  })();

  // 조건문(If)
  $: if (count > 0) {
    console.log('if:', double)
  }

  // 반복문(For)
  $: for (let i = 0; i < 3; i += 1) {
    count
    console.log('for:', i)
  }

  // 조건문(Switch)
  $: switch (count) {
    case 1:
      console.log('switch: 1')
      break
    default:
      console.log('switch: default')
  }

  // 유효범위
  $: {
    function scope1() {
      console.log('scope1')
      function scope2() {
        console.log('scope2')
        function scope3() {
          console.log('scope3', count)
        }
        scope3()
      }
      scope2()
    }
    scope1()
  }

  function log() {
    console.log('fn: Heropy!')
  }
  function assign() {
    count += 1
  }
</script>

<button on:click={assign}>Assign!</button>
```

#### 속성 바인딩

- 디렉티브로 바인딩. 근데 Vue의 디렉티브 바인딩보다 더 단순한듯

```jsx
// 클래스 바인딩 - 변수의 참거짓여부(굉장히 선언적이네유)
<div class:active={active}>
  Hello
</div>

// 스타일 바인딩
<h2
  style="
  background-color: {color};
  color: {white};
  {letterSpacing}"
>
  Heropy!
</h2>
```

```jsx
<script>
  let active = true
  let valid = false
  let camelCase = true
  let color = {
    white: '#FFF',
    red: '#FF0000'
  }
  let bold = 'font-weight: bold;'

  function multiClass() {
    return 'active valid camel-case'
  }
</script>

<div class={active ? 'active' : ''}>
  3항 연산자 보간
</div>

<div class:active={active}>
  Class 지시어(Directive) 바인딩
</div>

<div class:active>
  Class 지시어 바인딩 단축 형태
</div>

<div
  class:active
  class:valid
  class:camelCase
  class:camel-case={camelCase}>
  다중 Class 지시어 바인딩
</div>

<div class={multiClass()}>
  함수 실행
</div>

<div
  class="style-binding"
  style="
    color: {color.white};
    background-color: {color.red};
    {bold}">
  스타일 바인딩
</div>
```

### 스타일 유효범위

- <style> 로 스타일 선언하면 기본적으로 해당 컴포넌트에 scoped됨 Vue처럼
- 이를 위해서 class 속성에 svelte hash가 추가된다
- 글로벌 모디파이어를 주면 전역으로 선언 가능 : 해쉬가 사라짐

```jsx
<style>
  :global(ul.container li.item) {
    width: 100px;
  }
</style>
```

### 요소 바인딩

- bind:this를 통해 바로 요소 참조 가능
- 화면에 없던 요소가 생기고 나서 binding을 해야할 경우 갱신까지 기다리도록 tick 사용
- 입력요소는 bind:value 이런식으로 => 기본적으로 value 속성을 통해 데이터를 연결하며, 많은 경우 양방향 데이터 바인딩을 위해 bind 지시어 사용 (**양방향 데이터 바인딩!!**)

```jsx
// 요소 바인딩

<script>
  import { tick, onMount } from 'svelte'

  let isShow = false
  let inputEl // 요소가 들어갈 변수

  async function toggle() {
    isShow = !isShow
    await tick() // 이것도 진짜 선언적이네
    // const inputEl = document.querySelector('input')
    console.log(inputEl)
    inputEl && inputEl.focus()
  }
</script>

<button on:click={toggle}>Edit!</button>
{#if isShow}
  <input bind:this={inputEl} />
{/if}
```

### 리스트 렌더링시 key

- 문법이 희한함

```jsx
<ul>
  {#each fruits as fruit (fruit.id)}
    <li>{fruit.name}</li>
  {/each}
</ul>
```

### 키 블록

- 뭉뜽그려진 반응성, Vue의 watch 속성
- 블록 안에서 Svelte를 사용하는 경우, 컴포넌트가 초기화되고 연결됨

```jsx
<script>
  import Count from './Count.svelte'
  let reset = false
</script>

{#key reset}
  <Count />
{/key}

<button on:click={() => reset = !reset}>
  Reset!
</button>
```

### 비동기 블록

- 와 이게뭐노..
- 비동기 요청 결과물이 담기는 Promise 변수를 연결하여 프로미스의 상태를 매우 직관적으로 화면에 반영할 수 있음
- React에서 요즘 새로 나오는 비동기 렌더링 그느낌이네

```jsx
{#await promise}
  <!-- pending(대기) -->
  <p style="color: royalblue;">loading...</p>
{:then movies}
  <!-- fulfilled(이행) -->
  <ul>
    {#each movies as movie}
      <li>{movie.Title}</li>
    {:else}
      <li>검색된 결과가 없어요...</li>
    {/each}
  </ul>
{:catch err}
  <!-- rejected(거부) -->
  <p style="color: red;">{err.message}</p>
{/await}
```

### 이벤트 바인딩과 이벤트 수식어

- 이건 정말 Vue랑 비슷함
- 바인딩은 기본적으로 `on:click={() => {}}` 이렇게 하고
- 수식어는 바로 뒤에 |로 해서 붙임 `on:click|preventDefault|capture|self|once={() => console.log('!')`
- preventDefault, stopPropogation, passive, capture, once(한번 하고 핸들러 삭제??!!) 지원

### 기본적으로 데이터 흐름은 단방향인데 이벤트 에미터도 지원함

- Vue랑 같은데
- 개인적으로 emit은 한 컴포넌트에 로직이 많이 몰리게 하고 자식 컴포넌트에 prop말고 다른 이벤트 핸들러까지 덕지덕지 붙여야 한다는 점에서 선호하지는 않음.. 단방향으로 계속 쓸거같긴 함. 근데 Vue 쓸때는 리액트처럼 함수 prop같은 것이 컨센서스가 아니라서 emit을 사용하기는 했음

```jsx
// 자식
<script>
  import {createEventDispatcher} from 'svelte' const dispatch =
  createEventDispatcher() const 전달할_데이터 = '나는 데이터!'
  dispatch('이벤트_이름', 전달할_데이터)
</script>

// 부모
<script>
  import Child from './Child.svelte'
</script>

<Child on:이벤트_이름={event => {
  console.log(event.detail) // '나는 데이터!'
}} />
```

### contextAPI도 지원

- ?? 갑분 리액트
- 근데 자주 쓸거같지는 않넹

### 슬롯

- 이것도 용어는 Vue의 개념인데 React의 children에 더 가까운 느낌인듯?

```jsx
<script>
  import Hello from './Hello.svelte'
</script>

<!--요소의 내용-->
<h1>Hello world!</h1>

<!--컴포넌트의 내용-->
<Hello>Hello world!</Hello>


// Hello.svelte
<h2>
  <!--내용은 <slot>에 들어감!-->
  <slot></slot>
</h2>
<p>I'm 'Hello' Component.</p>

// fallback
<slot>Fallback content, 들어오는 내용이 없으면 이 문장을 출력합니다!</slot>
```

### 네임 슬롯

- 이거는 확실히 Vue군..

```jsx
// 실사용
<script>
  import Card from './Card.svelte'
</script>

<Card>
  <div slot="age">85</div>
  <h2 slot="name">Heropy</h2>
  <div slot="email">thesecon@gmail.com</div>
</Card>

<Card>
  <span slot="email">neo@abc.com</span>
  <h3 slot="name">Neo</h3>
</Card>

<style>
  h2 {
    font-weight: 400;
  }
  h3 {
    color: red;
  }
</style>

// 슬롯 컴포넌트

<div class="card">
  <slot name="name"></slot>
  <slot name="age">??</slot>
  <slot name="email"></slot>
</div>

<style>
  .card {
    margin: 20px;
    padding: 12px;
    border: 1px solid gray;
    border-radius: 10px;
    box-shadow: 4px 4px 0 rgba(0,0,0,.1);
  }
</style>
```

### Svelte store
