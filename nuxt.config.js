
module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css',  rel:'stylesheet' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.2.1/firebase-auth.js' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/authenticate.js', ssr: false},
    {src: '~/plugins/vueMapbox.js', ssr: false},
    {src: '~/plugins/eventListeners.js', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {     
    port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },
  router: {
    middleware: 'router-auth'
  }
}
