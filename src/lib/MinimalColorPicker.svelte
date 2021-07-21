<script lang="ts">
  import { colorMode } from './stores'
</script>

<p>Current Colormode: <code>$colorMode = '{$colorMode}'</code></p>

<button on:click={() => ($colorMode = `dark`)}>Dark</button>
<button on:click={() => ($colorMode = `light`)}>Light</button>
<button on:click={() => ($colorMode = `auto`)}>Auto</button>
