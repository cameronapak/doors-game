<script>
  import Button from "./components/Button.svelte";
  import { DoorsGame } from "./gameplay.js";

  DoorsGame.playGame();

  let reRender = true;

  $: ({ doors, currentLevel, isGameOver } = DoorsGame);

  $: if (reRender) {
    doors = DoorsGame.doors;
    isGameOver = DoorsGame.isGameOver;
    currentLevel = DoorsGame.currentLevel;

    // Do something.
    reRender = false;
  }

  function runFunctionAndReRender(callback = () => {}) {
    callback();
    reRender = true;
  }
</script>

<style>
  main {
    padding: 1rem;
    font-family: sans-serif;
  }

  .door {
    width: 128px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 128px;
    height: 128px;
    cursor: pointer;
    border-radius: 16px;
    background-color: #fec8d8;
  }

  .door-holder {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    gap: 8px;
  }

  .door-clicked {
    background-color: #e8f4ea;
  }
</style>

<main>
  {#if isGameOver} 
    GAME OVER LOL
    <button on:click={() => runFunctionAndReRender(DoorsGame.playGame)}>
      Reset Game
    </button>
  {:else}
    <h1>Doors Game - Level {currentLevel}</h1>
    <p>Multiples of {currentLevel}</p>
    <button on:click={() => runFunctionAndReRender(DoorsGame.nextLevel)}>
        Next Level
    </button>
    <br />
    <br />
    <div class="door-holder">
      {#each doors as door, i}
        <div class="door {door.hasBeenClicked && 'door-clicked' || ''}" key={i + 1} on:click={() => runFunctionAndReRender(() => door.onClick())}>
          {i + 1}
        </div>
      {/each}
    </div>
  {/if}
</main>