<script lang="ts">
  import Modal from './Modal.svelte'
  import { colorMode } from './stores'
  import Sun from './icons/Sun.svelte'
  import Moon from './icons/Moon.svelte'
  import BrightnessAuto from './icons/BrightnessAuto.svelte'

  export let iconSize = `1em`
  export let ariaLabelBtnOpener = `Open color mode picker`
  export let darkName = `Dark`
  export let lightName = `Light`
  export let autoName = `Auto`

  let open = false

  const setModeFactory = (mode: string) => () => {
    open = false
    $colorMode = mode
  }
</script>

<button class="opener" on:click={() => (open = true)} aria-label={ariaLabelBtnOpener}>
  <Moon width={iconSize} style="vertical-align: text-bottom;" />
</button>

{#if open}
  <Modal on:close={() => (open = false)} style="width: max-content; max-width: 90vw;">
    <div>
      <button on:click={setModeFactory(`light`)} class="choice light">
        <Sun />
        {lightName}</button
      >
      <button on:click={setModeFactory(`dark`)} class="choice dark">
        <Moon color="yellow" />
        {darkName}</button
      >
      <button on:click={setModeFactory(`auto`)} class="choice auto">
        <BrightnessAuto color="black" />
        {autoName}</button
      >
    </div>
  </Modal>
{/if}

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-content: center;
  }
  @media (max-width: 700px) {
    div {
      width: min-content;
    }
  }
  button {
    border: none;
    cursor: pointer;
  }
  button.opener {
    padding: 0;
    grid-area: colormode;
    background: transparent;
    color: yellow;
  }
  button.choice {
    height: 7ex;
    width: 10ex;
    display: grid;
    place-items: center;
    font-size: 3ex;
    box-shadow: 0 0 1em black;
    transition: 0.3s;
  }
  button.choice:hover {
    transform: scale(1.02);
  }
  button.choice.light {
    background: #f1f1f1;
    color: black;
  }
  button.choice.dark {
    background: #061725;
    color: white;
  }
  button.choice.auto {
    color: white;
    background: linear-gradient(to right bottom, white 50%, black 50%);
  }
  button.choice :global(svg) {
    height: 3ex;
    padding-bottom: 12pt;
  }
</style>
