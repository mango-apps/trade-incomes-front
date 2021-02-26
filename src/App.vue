<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
