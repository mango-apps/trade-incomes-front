<template>
  <div class="profile flex center flex-row vertical-center">
    <h1 class="is-dark">{{ name | splitInitials }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  filters: {
    splitInitials(name) {
      const splitted = name.split(' ')
      return splitted[0].charAt(0) + splitted[1].charAt(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: 90px;
  height: 90px;
  background: $primary;
  border-radius: 50%;
}
</style>
