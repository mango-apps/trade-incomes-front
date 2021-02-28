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
  width: 100%;
  max-width: 350px;
  min-height: 90px;
  max-height: 130px;
  background: $darker;
  border-radius: 7px;
  padding: 15px;
  margin: 15px 0;
  box-shadow: rgba($color: #000000, $alpha: 0.15) 0 3px 6px;
  &:last-of-type {
    margin-bottom: 65px;
  }
}
</style>
