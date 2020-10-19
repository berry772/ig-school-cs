<script>
  import store from "../store/store";
</script>

<!-- ################################################################## -->

<style>
  .boardContainer {
    margin: 1rem;
    display: inline-flex;
    flex-direction: column;
  }
  h3 {
    margin: 1rem;
  }
  .myRank {
    background-color: rgb(213, 238, 199);
  }
  .ranks {
    max-width: 26rem;
    width: 80vw;
    height: 2rem;
    display: inline-grid;
    grid-template-columns: 2fr 5fr 2fr;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
    margin: 3px;
    padding-left: 20px;
    justify-items: start;
    justify-content: center;
    align-items: center;
  }
  .ranks:nth-of-type(11) {
    margin-top: 30px;
  }
</style>

<!-- ################################################################## -->

{#if $store.gameState === "LEADER_BOARD"}
  <div class="boardContainer">
    <h3>
      {$store.game.totalCards === 16 ? "EASY" : "HARD"}<br/>
      {`Top Players ${new Date().toLocaleString("en-us", {
        month: "long"
      })}, ${new Date().getFullYear()}`}
    </h3>
    {#each $store.game.leaderBoard.ranks as {name,score},index}
      <div
        key={index}
        class="ranks"
        class:myRank={index+1===$store.game.myRanking||index===10}
      >
      {#if index<10}
      {(index + 1) + "."}
      {:else}
      {$store.game.myRanking}
      {/if}
        <span class:myRank={index+1===$store.game.myRanking||index===10}>{name}</span>
          {store.formatScore(score)}
      </div>
    {/each}
  </div>
{/if}