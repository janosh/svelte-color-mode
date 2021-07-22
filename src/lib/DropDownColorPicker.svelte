<script>
  import { colorMode } from './stores'
  import Sun from './icons/Sun.svelte'
  import Moon from './icons/Moon.svelte'
  import BrightnessAuto from './icons/BrightnessAuto.svelte'

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
