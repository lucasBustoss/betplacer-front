<template>
  <div class="loading-component">
    <v-progress-circular
      :size="size || 100"
      indeterminate
      :style="`color: ${color || 'yellow'} !important`"
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  props: ["size", "color"],
};
</script>
<style>
.loading-component {
  display: flex;
  justify-content: center;
}
</style>