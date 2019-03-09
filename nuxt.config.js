const pkg = require('./package')
const webpack = require('webpack')
const path = require('path')

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
  loading: { color: '#1890ff' },

  /*
  ** Global CSS
  */
  css: ['assets/style/main.less', 'assets/style/modal.less'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/antd-ui', ssr: false },
    { src: '@/plugins/axios', ssr: false },
    { src: '@/plugins/api', ssr: false },
    { src: '@/plugins/global', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    less: './assets/style/globalConfig.less'
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: ' http://localhost:7300/mock/5c6f6a401585903fa891d5c0/hs-mock',
    proxy: true
  },

  proxy: {
    '/api/master-data': {
      target: 'http://10.0.1.51:9999',
      changeOrigin: false
    },

    '/huashang/bi': {
      target: 'http://10.0.1.51:9909',
      changeOrigin: false
    }
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: true,

    babel: {
      plugins: [
        '@babel/plugin-transform-runtime',
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true
          }
        ],
        'lodash'
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ],

    loaders: {
      less: {
        javascriptEnabled: true
      }
    },

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

        config.devtool = 'cheap-module-eval-source-map'
      }

      Object.assign(config.resolve.alias, {
        ['types']: path.resolve(__dirname, 'types'),
        ['utils']: path.resolve(__dirname, 'utils'),
        ['store']: path.resolve(__dirname, 'store'),
        ['components']: path.resolve(__dirname, 'components')
      })
    }
  }
}
