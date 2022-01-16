<script>
  import GitHubCorner from 'svelte-github-corner'
  import Readme from '../../readme.md'
  import { colors, colorsByMode } from '../colors'
  import LiveDemo from '../components/LiveDemo.svelte'
  import MinimalColorPicker from '../components/MinimalColorPicker.svx'
  import { ColorMode } from '../lib'
</script>

<ColorMode {colorsByMode} otherColors={colors} />

<GitHubCorner
  href="https://github.com/janosh/svelte-color-mode"
  --ghc-bg="var(--textColor);"
  --ghc-color="var(--bodyBg)"
/>

<Readme>
  <LiveDemo slot="liveDemo" />
  <MinimalColorPicker slot="minimalColorPicker" />
</Readme>

<style>
  :global(h1) {
    display: flex;
    font-size: clamp(2rem, 2rem + 2vw, 3rem);
    place-items: center;
    place-content: center;
    margin: 1.2em 0;
  }
  :global(h1 br) {
    display: none;
  }
  @media (max-width: 600px) {
    :global(h1) {
      flex-direction: column;
      gap: 1ex;
      line-height: 1.1em;
    }
  }
  :global(.hide-in-docs) {
    display: none;
  }
</style>
