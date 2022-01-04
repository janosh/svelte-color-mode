<script>
  import BrightnessAuto from './icons/BrightnessAuto.svelte'
  import Moon from './icons/Moon.svelte'
  import Sun from './icons/Sun.svelte'
  import { colorMode } from './stores'

  const icons = {
    dark: Moon,
    light: Sun,
    auto: BrightnessAuto,
  }

  let value = $colorMode
  $: $colorMode = value
</script>

<div style="display: flex; place-items: center; gap: 1ex;">
  <svelte:component this={icons[$colorMode]} width="2em" />
  <select bind:value>
    <option value="dark">Dark</option>
    <option value="light">Light</option>
    <option value="auto">Auto</option>
  </select>
</div>
