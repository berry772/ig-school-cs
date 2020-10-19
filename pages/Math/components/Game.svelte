<script>
  import { store, handleClick } from "../store/store";
  import { formatScore } from "../store/utils";
  import TimeBar from "./TimeBar.svelte";
</script>

<!-- ################################################################## -->

<div class="screen">
  Stage {$store.currentStage+1}<br />
  score {formatScore($store.score)}
  {#if  $store.point!==0}
    <span class="ani">+{formatScore($store.point)}</span>
  {/if}
</div>
  <TimeBar />
  <div class="q-container">
    {#each $store.qScreen as q , index}
      <div class="q-tile">{q}</div>
    {/each}
  </div>
  <div class="a-container">
    {#each $store.answers as a, index}
      <div 
        class="a-tile" 
        class:wrong={$store.answerClicked[index]&&index!==$store.correctIndex}
        class:correct={$store.answerClicked[index]&&index===$store.correctIndex}
        on:click={handleClick.bind(null,index)}
      >{a}</div>
    {/each}
  </div>

<!-- ################################################################## -->

<style>
  .screen {
    height: 5rem;
    font-size: 2rem;
    display: inline-grid;
    place-content: center;
  }
  @keyframes slidein {
    from {
      opacity: 0.3;
      top: 120px;
    }

    to {
      opacity: 1;
      top: 100px;
    }
  }
  .ani {
    position: absolute;
    left: 230px;
    background-color: transparent;
    animation-duration: 0.5s;
    animation-name: slidein;
  }
  .q-container {
    display: inline-flex;
    place-content: center;
    gap: 1rem;
  }
  .q-tile {
    display: inline-grid;
    font-size: 2rem;
    width: 4rem;
    height: 4rem;
    border: 1px solid #555;
    color: #555;
    place-content: center;
    margin: 6px;
  }
  .a-container {
    display: inline-flex;
    place-content: center;
    gap: 1rem;
    margin: 1rem 0;
    height: 5rem;
  }
  .a-tile {
    display: inline-grid;
    font-size: 2rem;
    width: 4rem;
    height: 4rem;
    color: #555;
    place-content: center;
    margin: 6px;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
  }
  .wrong {
    background-color: rgb(219, 187, 177);
    transform: scale(1.2);
  }
  .correct {
    background-color: rgb(177, 219, 181);
    transform: scale(1.2);
  }
</style>