<template>
  <div class="card flex">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card {
  max-width: 100%;
  min-height: 90px;
  max-height: 130px;
  background: $darker;
  border-radius: 7px;
  padding: 15px;
  box-shadow: rgba($color: #000000, $alpha: 0.15) 0 3px 6px;
}
</style>
