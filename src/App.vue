<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    console.log(process.env)
  }
}
</script>
