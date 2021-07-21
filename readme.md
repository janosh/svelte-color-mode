<p align="center">
  <img src="static/favicon.svg" alt="Svelte Color Mode" height=150>
</p>

# Svelte Color Mode

[![NPM version](https://img.shields.io/npm/v/svelte-color-mode?color=blue&logo=NPM)](https://npmjs.com/package/svelte-color-mode)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0238699e-17a8-4423-85de-a5ca30baff0d/deploy-status)](https://app.netlify.com/sites/svelte-color-mode/deploys)

**[Live Demo](https://svelte-color-mode.netlify.app)**

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

At present, `svelte-color-mode` contains just a single UI component for changing the color mode, `ModalColorPicker.svelte`. More are planned. If you have a good idea for color mode UI and would like to contribute it, please do! Implementation-wise, all it takes is to import the `colorMode` store (see `stores.ts`) and change its value.

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
