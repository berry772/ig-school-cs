<script>
  import Home from "./pages/Home/Home.svelte";
  import DolchWords from "./pages/DolchWords/DolchWords.svelte";
  import MatchGame from "./pages/MatchGame/MatchGame.svelte";
  import Math from "./pages/Math/Math.svelte";
  import Mboard from "./pages/Mboard/Mboard.svelte";
  import Nav from "./Nav.svelte";

  let currentMenu = "m_board";
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");
  :global(*) {
    user-select: none;
    font-family: "Raleway";
    background-color: #ddd;
    color: #555;
    margin: 0;
    padding: 0;
    text-align: center;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  :global(button) {
    font-size: 20px;
    padding: 8px 12px;
    border: none;
    border-radius: 10px;
    display: inline-grid;
    place-content: center;
  }
  :global(button:focus) {
    outline: none;
  }
  :global(button:active) {
    background-color: rgb(223, 228, 179);
  }
  :global(button:disabled) {
    opacity: 0.4;
  }
  main {
    height: 100%;
    width: 100%;
    font-family: lato, sans-serif;
  }
  nav {
    background-color: #ccc;
    width: 100%;
    text-align: right;
  }
</style>

<svelte:head>
	<title>ig-learning</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</svelte:head>
<main>
    <nav>
      <Nav on:switchPage={({detail})=>currentMenu=detail} />
    </nav>
    {#if currentMenu==='home'}
	    <Home on:switchPage={({detail})=>currentMenu=detail} />
    {:else if currentMenu==='dolch'}
	    <DolchWords/>
    {:else if currentMenu==='match'}
	    <MatchGame/>
    {:else if currentMenu==='math'}
	    <Math/>
    {:else if currentMenu==='m_board'}
	    <Mboard />
    {:else}
	    <p>else</p>
    {/if}
</main>