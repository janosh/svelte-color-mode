<h1 align="center">
  <img src="https://raw.githubusercontent.com/janosh/svelte-color-mode/main/static/favicon.svg" alt="Svelte Color Mode" height=60>
  <br>&ensp;Svelte Color Mode
</h1>

<h4 align="center">

[![NPM version](https://img.shields.io/npm/v/svelte-color-mode?color=blue&logo=NPM)](https://npmjs.com/package/svelte-color-mode)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0238699e-17a8-4423-85de-a5ca30baff0d/deploy-status)](https://app.netlify.com/sites/svelte-color-mode/deploys)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/svelte-color-mode/main.svg)](https://results.pre-commit.ci/latest/github/janosh/svelte-color-mode/main)

</h4>

<div class="hide-in-docs">

**[Live Demo](https://svelte-color-mode.netlify.app)**

</div>

SSR-compatible, flash-free, `localStorage`-persisted color mode + multiple Svelte UI components for selecting current color mode.

<slot name="liveDemo" />

## Installation

```sh
yarn add -D svelte-color-mode
```

## Usage

In a SvelteKit project:

```svelte
<script>
  import { ColorMode, ColorPicker } from 'svelte-color-mode'

  const colorsByMode = {
    light: {
      textColor: `black`,
      linkColor: 'darkblue',
      hoverColor: 'darkorange',
      bodyBg: `white`,
    },
    dark: {
      textColor: `white`,
      linkColor: 'cornflowerblue',
      hoverColor: 'orange',
      bodyBg: '#061725',
    },
  }
</script>

<ColorMode {colorsByMode} />
```

## Props

Full list of props/bindable variables for this component:

- `colorsByMode`: `{ dark: { color1: 'white', color2: 'black', ... }, { light: { color1: 'black', color2: 'white', ... } } }` Object of objects where each sub-object defines a color mode (`'dark'`, `'light'`, `'blue'`, ...). All color modes should have identical keys defining the color names. Each color name becomes a CSS variable whose value changes to the value specified by the currently active color mode.
- `otherColors`: `{ [colorName: string]: colorValue: string }` You can also pass in another object of key-value pairs (no sub-objects) that are set as CSS custom variables in a flash-free, SSR-compatible manner alongside the `colorsByMode`. This is just for convenience. Of course, you could add these values into the `:root {}` scope of your `global.css` but then they would be inaccessible to JS. If those colors are the same as the ones used in `colorsByMode`, it would prevent [SSOT](https://wikipedia.org/wiki/Single_source_of_truth).
- `noKeyboardShortcuts` By default, `ColorMode.svelte` creates keyboard shortcuts to switch between modes:

  - `ctrl + 1` for light
  - `ctrl + 2` for dark
  - `ctrl + 3` for auto

  To turn this off, pass the `noKeyboardShortcuts` boolean flag: `<ColorMode noKeyboardShortcuts />`.

## Control

You can hook whatever UI component you want up to the `colorMode` store. All that UI component needs to do is to change the string value of that store to the key of the desired color mode defined in the `colorsByMode` object.

<slot name="minimalColorPicker" />

## Want to contribute?

At present, `svelte-color-mode` contains just a few UI components for changing the color mode, all under `src/lib/*ColorPicker.svelte`. More are welcome. If you have a good idea for a color mode UI and would like to contribute it, please do! Implementation-wise, all it takes is to import the `colorMode` store (see `stores.ts`) and change its value based on user input.

To submit a PR, clone the repo, install dependencies and start the dev server to try out your changes.

```sh
git clone https://github.com/janosh/svelte-color-mode
cd svelte-color-mode
yarn
yarn dev
```

## Examples

Used in production on these sites:

- [Afara](https://afara.foundation)
- [Ocean artUp](https://ocean-artup.eu)
- [Studenten bilden Schüler](https://studenten-bilden-schueler.de)
