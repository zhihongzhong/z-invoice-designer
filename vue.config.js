const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

module.exports = {

  productionSourceMap: false,
  
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(new CompressionPlugin({
        test: /\.(js|css|less)$/, 
        threshold: 10240, 
        deleteOriginalAssets: false
      }))
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
        },
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
        ]
      }
    }
  },

  devServer: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      '/financial-plus': {
        target: BASE_URL, 
        ws: false,
        changeOrigin: true
      },
    }
  },

  lintOnSave: false
}
