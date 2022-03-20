const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/_variables.scss'
      }
    }
  },
  transpileDependencies: true
})
