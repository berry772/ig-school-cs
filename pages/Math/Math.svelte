<script>
  import { onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { store, handleStart, gameReset } from "./store/store";
  import { formatScore } from "./store/utils";
  import Result from "./components/Result.svelte";
  import Game from "./components/Game.svelte";
  onDestroy(gameReset);
</script>

<!-- ################################################################## -->

{#if $store.status==="INITIAL"}
  <div class="start">
    <button on:click={handleStart}>START</button>
  </div>
{:else if $store.status === "PLAYING"}
  <Game />
{:else if $store.status === "COMPLETED"}
  <Result />
{/if}

<!-- ################################################################## -->

<style>
  button {
    font-size: 2rem;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
  }
  .start {
    height: 8rem;
    display: inline-grid;
    place-content: center;
  }
</style>
