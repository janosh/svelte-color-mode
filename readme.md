<p align="center">
  <img src="static/favicon.svg" alt="Svelte Color Mode" height=150>
</p>

<h1 align="center">Svelte Color Mode</h1>

<h4 align="center">

  [![NPM version](https://img.shields.io/npm/v/svelte-color-mode?color=blue&logo=NPM)](https://npmjs.com/package/svelte-color-mode)
  [![Netlify Status](https://api.netlify.com/api/v1/badges/0238699e-17a8-4423-85de-a5ca30baff0d/deploy-status)](https://app.netlify.com/sites/svelte-color-mode/deploys)
</h4>

**[Live Demo](https://svelte-color-mode.netlify.app)**

SSR-compatible, flash-free, `localStorage`-persisted color mode + multiple Svelte UI components for selecting current color mode.

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

For more docs, check out the **[live demo](https://svelte-color-mode.netlify.app)**.

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
