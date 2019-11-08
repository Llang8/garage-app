module.exports = {
  mode: 'universal',
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
    {src: '~/plugins/eventListeners.js', ssr: false},
    {src: '~/plugins/firebase.js', ssr: false},
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
  generate: {
    routes: () => {
      let firebase = require('firebase');
      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyB4y8Ga0uHHIxpHVFXH6kifKEU6bNMjnYY",
        authDomain: "garage-app-78457.firebaseapp.com",
        databaseURL: "https://garage-app-78457.firebaseio.com",
        projectId: "garage-app-78457",
        storageBucket: "garage-app-78457.appspot.com",
        messagingSenderId: "620969335942",
        appId: "1:620969335942:web:43ca9780c8bb56f2a1c507",
        measurementId: "G-4EQCX7B1V8"
      };


      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      
      const db = firebase.firestore();

      return db.collection('sales').get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => {
            return '/sale/' + doc.id;
          });
        })
    }
  },
  server: {     
    port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },
  router: {
    middleware: ['router-auth']
  }
}