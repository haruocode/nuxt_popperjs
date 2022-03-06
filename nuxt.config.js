const environment = process.env.NODE_ENV || 'development';
const envSet = require(`./environments/env.${environment}.js`)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'my-first-nuxt-app',
    titleTemplate: '%s | Qiita',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:8888',
      pathRewrite: {'^/api/': ''}
    }
  },
  plugins: [
    '~/plugins/axios.js'
  ],
  env: envSet,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

