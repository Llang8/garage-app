<template>
  <div class="index">
    <div class="flex-row">
      <div class="search-bar">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.87593 6.36905C7.5152 5.59986 7.83322 4.61386 7.76384 3.6162C7.69445 2.61855 7.243 1.68604 6.5034 1.01271C5.76381 0.339372 4.79304 -0.0229483 3.79304 0.00112737C2.79304 0.025203 1.84082 0.433822 1.13451 1.14197C0.428188 1.85012 0.0221532 2.80326 0.00087999 3.80311C-0.0203932 4.80295 0.344731 5.77249 1.02029 6.51003C1.69585 7.24756 2.62982 7.69629 3.62789 7.76286C4.62596 7.82943 5.61128 7.50871 6.37884 6.86743L9.39494 9.89265C9.42744 9.92628 9.46633 9.95309 9.50932 9.97152C9.55231 9.98995 9.59854 9.99963 9.64532 9.99999C9.69209 10.0003 9.73847 9.99139 9.78174 9.97362C9.82501 9.95586 9.8643 9.92964 9.89732 9.89652C9.93034 9.8634 9.95643 9.82403 9.97405 9.78071C9.99168 9.7374 10.0005 9.691 9.99998 9.64424C9.99946 9.59748 9.98964 9.55128 9.97106 9.50836C9.95249 9.46544 9.92554 9.42666 9.8918 9.39427L6.87593 6.36905ZM3.8964 7.06771C3.26536 7.06983 2.6479 6.8847 2.12217 6.53576C1.59644 6.18681 1.18609 5.68975 0.943095 5.10751C0.700096 4.52526 0.635369 3.88402 0.757109 3.26497C0.878849 2.64592 1.18158 2.07692 1.62697 1.62999C2.07237 1.18306 2.64039 0.878317 3.25912 0.75434C3.87785 0.630363 4.51947 0.69273 5.10273 0.933544C5.68599 1.17436 6.18466 1.58279 6.5356 2.10712C6.88654 2.63146 7.07397 3.24811 7.07416 3.87901C7.07484 4.7229 6.74063 5.53259 6.14487 6.1304C5.54912 6.72821 4.74047 7.06531 3.8964 7.06771Z" fill="black"/>
        </svg>
        <input type="text" v-model="search">
      </div>
      <div class="results-count">
        <p><strong>{{ sales.length }}</strong> sales in a <strong>{{ radiusMI }} mile</strong> radius.</p>
      </div>
    </div>
    <div class="results-container">
      <div class="result" v-for="(sale, index) in sales">
        <img :src="sale.images[0]" :alt="sale.title">
        <nuxt-link 
          :to="{name:'sale-id', params: {id: sale.id}}"
        >
          <h1 class="sale-title">{{ sale.title }}</h1>
        </nuxt-link>
        <h2 class="sale-town">{{ sale.city }}, {{ sale.state }}</h2>
        <p class="sale-description">{{ sale.description.substring(0, 300) }}...</p>
        <p class="categories"><strong>Categories:</strong><span v-for="(category, index) in sale.categories"> {{ category }}</span></p>
        <h3 class="distance">{{ Math.floor(Math.random() * 26) }} Miles</h3>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      search: '',
      radiusMI: 20
    }
  },
  created() {
    this.$store.dispatch('getSales')
      .then(() => {
        console.log(this.$store.state.sales);
      })
  },
  computed: {
    sales() {
      return this.$store.state.sales;
    }
  }
}
</script>

<style lang="scss">
@import '../assets/root.scss';


</style>
