<script>
  import store from "../store/store";
  let name = "";
  const onSubmitScore = event => {
    $store.game.newLeaderBoardEntry = {
      date: new Date(),
      rank: { name: name.trim().slice(0, 10), score: $store.game.score }
    };
    store.fetchLeaderboard($store.game.totalCards);
  };
</script>

<!-- ################################################################## -->

<style>
  h1,
  h2,
  h3,
  button {
    margin: 1rem;
  }
</style>

<!-- ################################################################## -->

{#if $store.gameState === "COMPLETED"}
  <h1>Completed!</h1>
  <h3>Total Try : {$store.game.moves}</h3>
  <h3>Clear Time : {Math.round($store.game.completedSeconds)} seconds</h3>
  <h2>Score : {$store.game.formattedScore}</h2>
  <form on:submit|preventDefault={onSubmitScore}>
    <label>Enter your name : </label>
    <input name="name" bind:value={name} autocomplete="off"/>
    <button type="submit" disabled={name.trim().length < 1}>
      Submit
    </button>
  </form>
  <button on:click={store.fetchLeaderboard.bind(null,$store.game.totalCards)}>
    Skip and Show Leaderboard
  </button>
{/if}