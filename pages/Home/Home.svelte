<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const handleClick = page => {
    dispatch("switchPage", page);
  };
</script>
<style>
  button {
    margin-top: 1rem;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
  }
</style>
<h1> Hello, Liam! </h1>
<button on:click={handleClick.bind(null,"dolch")}>Dolch Words</button><br/>
<button on:click={handleClick.bind(null,"match")}>Match Cards</button><br/>
<button on:click={handleClick.bind(null,"math")}>Math</button><br/>
<button on:click={handleClick.bind(null,"m_board")}>Memory Board</button>