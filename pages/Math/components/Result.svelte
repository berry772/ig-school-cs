<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { store, handleStart } from "../store/store";
  import { formatScore } from "../store/utils";
  let canClick;
  onMount(() => {
    canClick = false;
    setTimeout(() => (canClick = true), 3200);
  });
</script>

<!-- ################################################################## -->
<div class="result">
  <div  in:fade>TIME UP!</div>
  <div in:fade="{{delay:800}}">You have reached stage {$store.currentStage+1}</div>
  <div in:fade="{{delay:1600}}">and the score is</div>
  <div in:fade="{{delay:2400}}" class="score">{formatScore($store.score)}</div>
  <div in:fade={{delay:3200}}>
    <button on:click={()=>{if(canClick)handleStart()}}>RETRY</button>
  </div>
</div>
<!-- ################################################################## -->

<style>
  .result {
    font-size: 2rem;
    margin-top: 4rem;
    line-height: 3rem;
  }
  .score {
    font-size: 3rem;
    font-weight: 500;
  }
  button {
    margin-top: 4rem;
    font-size: 2rem;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
  }
</style>