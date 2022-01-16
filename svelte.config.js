import adapter from '@sveltejs/adapter-static'
import { s } from 'hastscript'
import { mdsvex } from 'mdsvex'
import linkHeadings from 'rehype-autolink-headings'
import headingSlugs from 'rehype-slug'
import preprocess from 'svelte-preprocess'

const rehypePlugins = [
  headingSlugs,
  [
    linkHeadings,
    {
      test: [`h2`, `h3`, `h4`, `h5`, `h6`], // don't auto-link <h1>
      behavior: `append`,
      content: s(
        `svg`,
        { width: 16, height: 16, viewBox: `0 0 16 16` },
        // symbol #octicon-link defined in app.html
        s(`use`, { 'xlink:href': `#octicon-link` })
      ),
    },
  ],
]

export default {
  extensions: [`.svelte`, `.svx`, `.md`],

  preprocess: [
    preprocess(),
    mdsvex({ rehypePlugins, extensions: [`.svelte`, `.svx`, `.md`] }),
  ],

  kit: {
    adapter: adapter(),

    // hydrate the <div/> with id 'svelte' in src/app.html
    target: `#svelte`,

    package: {
      // exclude icons, actions and stores from package.json "exports" field
      exports: (filepath) =>
        ![`actions`, `stores`, `icons`].some((str) => filepath.includes(str)),
    },

    vite: {
      server: {
        fs: { allow: [`..`] }, // needed to import readme.md
      },
    },
  },
}
