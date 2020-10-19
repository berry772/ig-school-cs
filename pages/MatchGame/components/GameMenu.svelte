<script>
	import store from "../store/store";

	let hard = false;
	function handleClickHard() {
	  hard = !hard;
	}
</script>

<!-- ################################################################## -->

<style>
	button {
	  box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
	  margin-top: 6px;
	}
	button.hard {
	  display: inline-block;
	  background-color: rgb(241, 205, 211);
	}
	button.easy {
	  display: inline-block;
	  color: rgba(84, 84, 84, 0.5);
	  background-color: rgb(218, 240, 212);
	}
</style>
<div>
	<button class={hard?"hard":"easy"} on:click={handleClickHard}>
	<input type="checkbox" bind:checked={hard}/>Hard</button>
	<button on:click={()=> store.newGame("ALPHABET", hard?20:16)}>Alphabet</button>
	<button on:click={()=> store.newGame("EMOJI", hard?20:16)}>Emoji</button>
</div>