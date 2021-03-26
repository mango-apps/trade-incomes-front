<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
.toasty {
  display: flex !important;
  justify-content: left !important;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold !important;
  text-align: center !important;
  background-color: $danger !important;

  svg {
    margin-right: 15px;
  }
}
</style>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'Default Title'
  },
  created() {
    document.title = 'Fundo de Investimentos BW'
  }
}
</script>
