<script>
  import store from "../store/store";

  const handleClick = index => {
    if (!$store.game.cards[index].flipped && !$store.game.cards[index].removed) {
      $store.game.cards[index].flipped = true;
      setTimeout(
        () => store.handleCardClick(index, $store.game.cards[index].key),
        700
      );
    }
  };
</script>

<!-- ################################################################## -->

<style>
  .flipCardContainer {
    user-select: none;
    display: inline-grid;
    grid-template-columns: repeat(4, 5em);
    grid-template-rows: repeat(5, 5em);
    grid-gap: 0.7em;
    justify-content: center;
    margin-top: 20px;
  }
  .flipCardOuter {
    perspective: 1000px;
    transition: 0.3s;
    font-size: 3em;
  }
  .flipCardInner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .flipped {
    transform: rotateY(180deg);
  }
  .removed {
    opacity: 0;
    transform: rotateY(90deg);
    pointer-events: none;
  }
  .cardFront {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
    background-color: var(--colorC);
    border: 3px solid var(--colorA);
    border-radius: 7px;
  }
  .cardBack {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: var(--patt);
    background-color: var(--colorC);
    border: 3px solid var(--colorA);
    border-radius: 7px;
  }
</style>

<!-- ################################################################## -->

<div>
	{#if $store.gameState === "PLAYING"}
	<div class="flipCardContainer" 
    style="--colorA: {$store.cardColor.a};
    --colorB: {$store.cardColor.b};
    --colorC: {$store.cardColor.c};
    --patt: {$store.cardColor.p};">
		{#each $store.game.cards as card, index}
		<div class="flipCardOuter" on:click={()=>handleClick(index)} class:removed={card.removed}>
			<div class="flipCardInner" class:flipped={card.flipped}>
				<div class="cardFront">{card.word}</div>
				<div class="cardBack">{""}</div>
			</div>
		</div>
		{/each}
	</div>
	{/if}
</div>