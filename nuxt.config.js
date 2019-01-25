const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  router: {
    middleware: 'route'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['ant-design-vue/dist/antd.css', 'assets/style/main.less'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/antd-ui', '@/plugins/axios'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: false
  },

  proxy: {
    '/api': {
      target: 'http://10.0.1.51:9909',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: true,

    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true
          }
        ],
        '@babel/plugin-transform-runtime',
        'lodash'
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        config.devtool = 'cheap-module-inline-source-map'
      }
    }
  }
}
