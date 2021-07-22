import { writable } from 'svelte/store'

const hasLocalStorage = typeof localStorage !== `undefined`

export const colorModeKey = `colorMode`

export const colorMode = writable<string>(
  (hasLocalStorage && localStorage[colorModeKey]) || `auto`
)

if (hasLocalStorage) {
  colorMode.subscribe(
    (val) => (localStorage[colorModeKey] = val)
  )
}
