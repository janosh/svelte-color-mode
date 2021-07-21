<script lang="ts">
  import { onMount } from 'svelte'

  import { colorMode, colorModeKey } from './stores'

  export let colorsByMode: Record<string, Record<string, string>>
  export let otherColors: Record<string, string>
  export let noKeyboardShortcuts = false

  const setModeFactory = (mode: string) => () => {
    $colorMode = mode
    applyColors()
  }

  onMount(() => colorMode.subscribe(applyColors))

  function applyColors() {
    // If colorMode is `auto` we pick dark or light depending on prefersDark media query.
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    let activeMode: `light` | `dark`
    if ($colorMode === `auto`) activeMode = prefersDark ? `dark` : `light`
    else activeMode = $colorMode

    // Define CSS vars for moded colors (both during SSR and in production).
    for (const [key, val] of Object.entries(colorsByMode[activeMode])) {
      if (val === undefined) console.error(`CSS variable ${key} is undefined`)
      document.body.style.setProperty(`--${key}`, val)
    }

    // Define CSS vars for non-moded colors as well while we're at it
    for (const [key, val] of Object.entries(otherColors)) {
      document.body.style.setProperty(`--${key}`, val)
    }
  }

  // boundFunc and <svelte:head> below provide SSR support
  // we modify a stringified version of applyColors so it can run before hydration
  // and prevent color flashes on page load
  const boundFunc = String(applyColors).replace(/\$colorMode/g, `colorMode`)

  /* eslint-disable no-useless-escape */
  const script = `
    <script>
      const colorMode = localStorage.${colorModeKey} || 'auto'
      const colorsByMode = ${JSON.stringify(colorsByMode)}
      const otherColors = ${JSON.stringify(otherColors)}
      window.addEventListener('DOMContentLoaded', ${boundFunc})
    <\/script>`
  /* eslint-enable no-useless-escape */

  const handleKeydown = (event: KeyboardEvent) => {
    if (!event.ctrlKey) return
    if (event.key === `1`) setModeFactory(`light`)()
    if (event.key === `2`) setModeFactory(`dark`)()
    if (event.key === `3`) setModeFactory(`auto`)()
  }
</script>

<svelte:window on:keydown={noKeyboardShortcuts ? undefined : handleKeydown} />

<svelte:head>
  {@html script}
</svelte:head>
