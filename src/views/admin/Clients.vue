<template>
  <h1>clients</h1>
</template>

<script>
export default {
  name: 'Clients',
  created() {
    this.$axios.get('/manager/users')
  }
}
</script>

<style></style>
