<script>
  import { dWords } from "./store/data";
  const keys = Object.keys(dWords);
  let currentKey = keys[0];
  let currentSet = dWords[currentKey];
  let currentPosition = 0;
  const voice = window.speechSynthesis;
  const speakUtter = new SpeechSynthesisUtterance();
  speakUtter.lang = "en-US";
  speakUtter.pitch = 1;
  speakUtter.rate = 1;

  let voiceDelay = false;

  const handleSpeak = () => {
    voice.cancel();
    speakUtter.text = currentSet[currentPosition];
    let delay = 0;
    if (voiceDelay) delay = 1200;
    const timeout = setTimeout(() => {
      voice.cancel();
      voice.speak(speakUtter);
    }, delay);
  };
  const changeKey = index => {
    currentKey = keys[index];
    currentSet = dWords[currentKey];
    currentPosition = 0;
    handleSpeak();
  };
  const wordBefore = () => {
    currentPosition--;
    handleSpeak();
  };
  const wordRandom = () => {
    currentPosition = Math.floor(Math.random() * currentSet.length);
    handleSpeak();
  };
  const wordAfter = () => {
    currentPosition++;
    handleSpeak();
  };
  const wordChange = index => {
    currentPosition = index;
    handleSpeak();
  };
</script> 

<!-- ################################################################## -->

<style>
  .card {
    width: 100%;
    display: grid;
    place-content: center;
  }
  .word {
    min-width: 300px;
    font-family: "Railway";
    font-size: 5rem;
    text-align: center;
    border: 1px solid #555;
    border-radius: 20px;
    padding: 0.8rem 1.2rem 1rem 1rem;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
    margin: 1rem 0px;
  }
  .buttons {
    text-align: center;
  }
  .currentItem {
    background-color: rgb(223, 228, 179);
  }
  .separator {
    height: 3px;
    width: 100%;
    background-color: #ccc;
    margin: 5px 0px;
  }
  button.items {
    font-size: 16px;
  }
  button.control {
    height: 5rem;
    box-shadow: 3px 3px 3px rgba(80, 80, 80, 0.6);
    background-color: #ccc;
  }

  /* #####   Switch   ##### */
  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 40px;
    height: 20px;
    background: grey;
    display: inline-block;
    border-radius: 20px;
    position: relative;
  }
  label:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 18px;
    transition: 0.3s;
  }
  input:checked + label {
    background: #bada55;
  }
  input:checked + label:after {
    left: calc(100% - 1px);
    transform: translateX(-100%);
  }
  label:active:after {
    width: 20px;
  }
</style>

<!-- ################################################################## -->

<input type="checkbox" id="switch" bind:checked={voiceDelay}/><label for="switch">Toggle</label>
{#each keys as key, index}
  <button class="items" class:currentItem={key===currentKey} 
  on:click={()=>changeKey(index)}>{index+1}. {key}</button>
{/each}

<div class="separator"></div>

<div class="card">
  <div class="word">
    {currentSet[currentPosition]}
  </div>
</div>
<div class="separator"></div>

{#each currentSet as word, index}
  <button class="items" class:currentItem={index===currentPosition} 
  on:click={()=>wordChange(index)}>{word}</button>
{/each}

<div class="separator"></div>
  <div class="buttons">
    <button class="control" disabled={currentPosition===0}
      on:click={wordBefore}>◀️ previous</button>
    <button class="control" 
      on:click={wordRandom}
      >🔀 random</button>
    <button class="control"  disabled={currentPosition===currentSet.length-1}
      on:click={wordAfter}>▶️ next
    </button>
</div>
