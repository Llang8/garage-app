<template>
  <div class="index">
    <div class="flex-row">
      <div class="search-bar">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.87593 6.36905C7.5152 5.59986 7.83322 4.61386 7.76384 3.6162C7.69445 2.61855 7.243 1.68604 6.5034 1.01271C5.76381 0.339372 4.79304 -0.0229483 3.79304 0.00112737C2.79304 0.025203 1.84082 0.433822 1.13451 1.14197C0.428188 1.85012 0.0221532 2.80326 0.00087999 3.80311C-0.0203932 4.80295 0.344731 5.77249 1.02029 6.51003C1.69585 7.24756 2.62982 7.69629 3.62789 7.76286C4.62596 7.82943 5.61128 7.50871 6.37884 6.86743L9.39494 9.89265C9.42744 9.92628 9.46633 9.95309 9.50932 9.97152C9.55231 9.98995 9.59854 9.99963 9.64532 9.99999C9.69209 10.0003 9.73847 9.99139 9.78174 9.97362C9.82501 9.95586 9.8643 9.92964 9.89732 9.89652C9.93034 9.8634 9.95643 9.82403 9.97405 9.78071C9.99168 9.7374 10.0005 9.691 9.99998 9.64424C9.99946 9.59748 9.98964 9.55128 9.97106 9.50836C9.95249 9.46544 9.92554 9.42666 9.8918 9.39427L6.87593 6.36905ZM3.8964 7.06771C3.26536 7.06983 2.6479 6.8847 2.12217 6.53576C1.59644 6.18681 1.18609 5.68975 0.943095 5.10751C0.700096 4.52526 0.635369 3.88402 0.757109 3.26497C0.878849 2.64592 1.18158 2.07692 1.62697 1.62999C2.07237 1.18306 2.64039 0.878317 3.25912 0.75434C3.87785 0.630363 4.51947 0.69273 5.10273 0.933544C5.68599 1.17436 6.18466 1.58279 6.5356 2.10712C6.88654 2.63146 7.07397 3.24811 7.07416 3.87901C7.07484 4.7229 6.74063 5.53259 6.14487 6.1304C5.54912 6.72821 4.74047 7.06531 3.8964 7.06771Z" fill="black"/>
        </svg>
        <input type="text" v-model="search" placeholder="Search sales..." @keyup.enter="searchSales()">
      </div>
      <div class="results-count">
        <p><strong>{{ sales.length }}</strong> sales in a <strong>{{ radiusMI }} mile</strong> radius.</p>
      </div>
    </div>
    <div class="results-container">
      <div class="result" v-for="(sale, index) in sales">
        <img v-if="sale.images" :src="sale.images[0]" :alt="sale.title">
        <img v-else src="https://placehold.it/150x150" :alt="sale.title">
        <svg @click="bookmark(sale.id)" v-if="!bookmarked.includes(sale.id) && !bookmarkQueue.includes(sale.id)" width="9" height="18" viewBox="0 0 9 18" style="float: right; margin-left: 5px;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.40637 17.9997C8.32808 17.9998 8.25054 17.9833 8.17827 17.951C8.106 17.9187 8.04044 17.8713 7.98542 17.8116L4.49804 14.0418L1.01302 17.8116C0.930535 17.901 0.82513 17.9621 0.710187 17.9872C0.595244 18.0123 0.475942 18.0003 0.367414 17.9525C0.258886 17.9048 0.16603 17.8236 0.100619 17.7192C0.035207 17.6148 0.000175095 17.4919 0 17.3661V0.633973C5.14056e-05 0.550664 0.015413 0.468183 0.0451948 0.391237C0.0749766 0.31429 0.118607 0.244385 0.173585 0.185515C0.228563 0.126646 0.293817 0.0799676 0.365621 0.0481375C0.437426 0.0163074 0.514374 -5.50144e-05 0.592073 1.38966e-07H8.40795C8.48565 -5.50144e-05 8.5626 0.0163074 8.6344 0.0481375C8.70621 0.0799676 8.77146 0.126646 8.82644 0.185515C8.88142 0.244385 8.92502 0.31429 8.9548 0.391237C8.98459 0.468183 8.99995 0.550664 9 0.633973V17.3645C9.00015 17.448 8.98491 17.5308 8.95511 17.608C8.92532 17.6853 8.88158 17.7554 8.82641 17.8145C8.77124 17.8735 8.70572 17.9202 8.63364 17.952C8.56155 17.9838 8.48432 18 8.40637 17.9997ZM4.49804 12.5073C4.57632 12.5072 4.65384 12.5238 4.72609 12.5561C4.79835 12.5884 4.8639 12.6357 4.91899 12.6953L7.81392 15.8249V1.2692H1.18257V15.8249L4.0775 12.6953C4.13252 12.6357 4.19801 12.5884 4.2702 12.5561C4.34239 12.5239 4.41982 12.5072 4.49804 12.5073Z" fill="#4C6085"/>
        </svg>
        <svg @click="removeBookmark(sale.id)" class="checked-bookmark" v-if="bookmarked.includes(sale.id) || bookmarkQueue.includes(sale.id)" version="1.1"  width="9" height="18"  style="float: right; margin-left: 5px;enable-background:new 0 0 9 18;" id="Layer_1" x="0px" y="0px"
        viewBox="0 0 9 18">
            <path class="st0" d="M8.4,18c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1-0.1-0.2-0.1L4.5,14L1,17.8C0.9,17.9,0.8,18,0.7,18s-0.2,0-0.3,0
                c-0.1,0-0.2-0.1-0.3-0.2C0,17.6,0,17.5,0,17.4V0.6c0-0.1,0-0.2,0-0.2c0-0.1,0.1-0.1,0.1-0.2C0.2,0.1,0.3,0.1,0.4,0
                c0.1,0,0.1,0,0.2,0h7.8c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0.1,0.2,0.1C8.9,0.2,8.9,0.3,9,0.4c0,0.1,0,0.2,0,0.2v16.7c0,0.1,0,0.2,0,0.2
                c0,0.1-0.1,0.1-0.1,0.2c-0.1,0.1-0.1,0.1-0.2,0.1C8.6,18,8.5,18,8.4,18z M4.5,12.5c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0.1,0.2,0.1l2.9,3.1
                V1.3H1.2v14.6l2.9-3.1c0.1-0.1,0.1-0.1,0.2-0.1C4.3,12.5,4.4,12.5,4.5,12.5z"/>
            <rect y="0.9" class="st1" width="9" height="12.3"/>
            <polygon class="st1" points="0.5,12.6 4.8,13 1.1,16.9 "/>
            <polygon class="st1" points="8.5,12.4 8,16.6 4.4,13.2 "/>
        </svg>            
        <nuxt-link 
          :to="{name:'sale-id', params: {id: sale.id}}"
        >
          <h2 class="sale-title">{{ sale.title }}</h2>
        </nuxt-link>
        <h3 class="sale-town">{{ sale.city }}, {{ sale.state }}</h3>
        <p class="sale-description" v-if="sale.description">{{ sale.description.substring(0, 200) }}...</p>
        <div class="sale-buttons">
          <nuxt-link
            :to="{name:'sale-id', params: {id: sale.id}}"
            class="btn btn-primary"
          >
            See More
          </nuxt-link>
          <nuxt-link
            :to="{ path: '/mapview', query: { lat: sale.geopoint[0], lng: sale.geopoint[1] }}"
            class="btn btn-secondary"
          >
            Open Map
          </nuxt-link>
          <a
            to="javascript:void(0)"
            @click="openMaps(sale)"
            class="btn btn-secondary"
          >
            Get Directions
          </a>
        </div>
        <p class="categories"><span class="categories-label">Categories:</span><br /><span v-for="(category, index) in sale.categories" class="category"> {{ category }}</span></p> 
        <p class="distance"><span class="distance-value">{{ sale.distance }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      search: '',
      radiusMI: 20,
      bookmarkQueue: []
    }
  },
  created() {
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.$store.commit('setUserPosition', {
        position: position.coords
      });
    });
    this.$store.dispatch('getSales')
      .then(() => {
        console.log(this.$store.state.sales);
      })
    this.$store.dispatch('getBookmarks', {
      uid: this.$store.state.user.uid
    })
  },
  computed: {
    sales() {
      console.log(this.$store.state.sales)
      return this.$store.state.sales;
    },
    bookmarked() {
      return this.$store.state.bookmarks.map((bookmarks) => {
        console.log(bookmarks.id);
        return bookmarks.id;
      });
    }
  },
  methods: {
    bookmark(id) {
      this.bookmarkQueue.push(id);
      this.$store.dispatch('addBookmark', {
        uid: this.$store.state.user.uid,
        saleId: id
      })
      .then((res) => {
        if(this.bookmarkQueue.includes(id))
          this.bookmarkQueue.splice(this.bookmarkQueue.indexOf(id), 1);
        console.log(res);
      })
      .catch((e) => {
        if(this.bookmarkQueue.includes(id))
          this.bookmarkQueue.splice(this.bookmarkQueue.indexOf(id), 1);
        console.error(e);
      })
    },
    removeBookmark(id) {
      if(this.bookmarkQueue.includes(id))
          this.bookmarkQueue.splice(this.bookmarkQueue.indexOf(id), 1);

      let bookmark = this.$store.state.bookmarks.filter((bookmark) => {
        return bookmark.id == id;
      })[0];

      this.$store.dispatch('removeBookmark', {
        id: bookmark.bookmarkId
      })
      .catch((e) => {
        console.error(e);
      })
    },
    searchSales() {
      console.log(this.search);
    },
    openMaps(sale) {
        let lat = sale.geopoint[0];
        let lng = sale.geopoint[1];
        /* if we're on iOS, open in Apple Maps */
        if
            ((navigator.platform.indexOf("iPhone") != -1) || 
            (navigator.platform.indexOf("iPad") != -1) || 
            (navigator.platform.indexOf("iPod") != -1)) {
            window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
        /* else use Google */
        } else {
            window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
        }
    },
  }
}
</script>

<style lang="scss">
@import '../assets/root.scss';

.st0{fill-rule:evenodd;clip-rule:evenodd;fill:hsl(215, 96%, 32%);}
.st1{fill:hsl(215, 96%, 32%);}

</style>
