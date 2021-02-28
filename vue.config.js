module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/index.scss";`
      }
    }
  },
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/]
    }
  }
}
