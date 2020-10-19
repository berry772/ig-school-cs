<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const handleClick = page => {
    dispatch("switchPage", "home");
  };
</script>

<div class="nav-container" on:click={handleClick} >
    <svg viewBox="0 0 100 80" width="30" height="30">
        <rect width="100" height="16" rx="8"></rect>
        <rect y="30" width="100" height="16" rx="8"></rect>
        <rect y="60" width="100" height="16" rx="8"></rect>
    </svg>
</div>

<style>
  .nav-container {
    background-color: transparent;
    width: 3rem;
    height: 3rem;
    display: inline-grid;
    place-content: center;
  }
  svg {
    background-color: transparent;
    fill: #555;
  }
</style>