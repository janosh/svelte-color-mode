<script lang="ts">
  import { onMount } from 'svelte'

  import { colorMode, colorModeKey } from './stores'

  export let colorsByMode: Record<string, Record<string, string>>
  export let otherColors: Record<string, string> = {}
  export let noKeyboardShortcuts = false

  function setColorMode(mode: string) {
    $colorMode = mode
    applyColors()
  }

  // subscribe to colorMode changes in onMount so it doesn't run during SSR where `document` is unavailable
  onMount(() => colorMode.subscribe(applyColors))

  function applyColors() {
    // If colorMode is `auto` we pick dark or light depending on prefersDark media query.
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches

    if (![`light`, `dark`, `auto`].includes($colorMode)) {
      // This can happen e.g. during development of a new UI component that modifies $colorMode incorrectly.
      const fixColorMode = prefersDark ? `dark` : `light`
      console.error(
        `Warning: colorMode had invalid value ${$colorMode}. It was auto-set to ${fixColorMode}.`
      )
      $colorMode = fixColorMode
    }

    let activeMode = $colorMode as `light` | `dark` | `auto`
    if (activeMode === `auto`) activeMode = prefersDark ? `dark` : `light`

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
    if (event.key === `1`) setColorMode(`light`)
    if (event.key === `2`) setColorMode(`dark`)
    if (event.key === `3`) setColorMode(`auto`)
  }
</script>

<svelte:window on:keydown={noKeyboardShortcuts ? undefined : handleKeydown} />

<svelte:head>
  {@html script}
</svelte:head>
