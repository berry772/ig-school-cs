<script>
  import { store, resetBoard } from "./store/store";
  import { onMount } from "svelte";
  onMount(() => {
    reset();
  });
  const handleStart = () => {
    $store.status = 1;
    $store.board.fill("");
  };
  const handleCheck = () => {
    $store.status = 2;
  };
  const handleReset = () => {
    $store.status = 0;
    reset();
  };
  const reset = () => {
    resetBoard();
    $store.a = Math.floor(Math.random() * 20);
    $store.b = $store.a;
    while ($store.a === $store.b) {
      $store.b = Math.floor(Math.random() * 20);
    }
    $store.board[$store.a] = "1";
    $store.board[$store.b] = "2";
  };

  let q = Math.floor(Math.random() * 10);
  const newNumber = () => (q = Math.floor(Math.random() * 10));
</script>

<!-- ################################################################## -->
{#if 1>2}
<div class="container">
{#each $store.board as item}
<button>{item}</button>
{/each}
</div>


{#if $store.status===0}
<button class="start" on:click={handleStart}>Start</button>
{:else if $store.status === 1}
<button class="start" on:click={handleCheck}>Check</button>
{:else if $store.status === 2}
<button class="start" on:click={handleReset}>Reset</button>
{/if}
{/if}

<div class="count">
  {#each [...Array(q)] as dot}
    O
  {/each}
</div>




<!-- ################################################################## -->

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
  }
  button {
    display: inline-block;
    border: 2px solid black;
    width: 19vw;
    height: 19vw;
    max-width: 95px;
    max-height: 95px;
    font-size: 3rem;
    margin: 0px;
  }
  .start {
    margin-top: 2rem;
    width: 50vw;
    max-width: 200px;
    background-color: rgb(113, 216, 113);
  }
</style>