<script lang="ts">
  import { DropDownColorPicker, ModalColorPicker } from '../lib'
</script>

<h2>Live Demo</h2>

Use any of the UI elements below to change the current color mode.

<div>
  <div style="width: 50px; height: 50px; background: black; border-radius: 5px;">
    <ModalColorPicker iconSize="2em" />
  </div>

  <DropDownColorPicker />
</div>

<style>
  div {
    display: flex;
    place-content: center;
    gap: 3em;
  }
</style>
