<script lang="ts">
  import { onMount } from 'svelte'

  import { colorMode, colorModeKey } from './stores'

  export let colorsByMode: Record<string, Record<string, string | number>>
  export let otherColors: Record<string, string> = {}
  export let noKeyboardShortcuts = false

  // Rename component props to prevent AcornJS from deduplicating variables
  // in applyColors e.g. colorsByMode to colorsByMode2. This oocur if e.g.
  // the user had a colors.js module with export const colorsByMode in it.
  // colorsByMode2 would break the script this component adds to <svelte:head>.
  $: __colorsByMode__ = colorsByMode
  $: __otherColors__ = otherColors

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
      // Invalid color modes can occur e.g. during development of a new UI component that modifie
      // $colorMode incorrectly. To not be stuck in a broken state, we restore a sensible state here.
      const fixedColorMode = prefersDark ? `dark` : `light`
      console.error(
        `Warning: colorMode had invalid value '${$colorMode}'. It was reset to '${fixedColorMode}'.`
      )
      $colorMode = fixedColorMode
    }

    let activeMode = $colorMode as `light` | `dark` | `auto`
    if (activeMode === `auto`) activeMode = prefersDark ? `dark` : `light`

    // Define CSS vars for moded colors (both during SSR and in production).
    for (const [key, val] of Object.entries(__colorsByMode__[activeMode])) {
      if (!val) console.error(`colorsByMode has invalid value ${val} for key '${key}'`)
      document.body.style.setProperty(`--${key}`, val)
    }

    // Define CSS vars for non-moded colors as well while we're at it
    for (const [key, val] of Object.entries(__otherColors__)) {
      document.body.style.setProperty(`--${key}`, val)
    }
  }

  // boundFunc runs inside <svelte:head> to provide SSR support.
  // TODO: Find a way to run applyColors before hydration to prevent
  // color flashes on page load.
  const boundFunc = String(applyColors).replace(/\$colorMode/g, `colorMode`)

  /* eslint-disable no-useless-escape */
  const script = `
    <script>
      const colorMode = localStorage.${colorModeKey} || 'auto'
      const __colorsByMode__ = ${JSON.stringify(colorsByMode)}
      const __otherColors__ = ${JSON.stringify(otherColors)}
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
