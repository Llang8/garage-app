<template>
    <div class="mapview">
      <!-- <div class="map-container" v-if="mapCreated"> -->
        <client-only>
          <MglMap 
              class="map"
              :accessToken="accessToken"
              :mapStyle="mapStyle"
              :center="mapCenter"
              :zoom="mapZoom"
              @load="mapLoad"
          >
  <!--             <MarkerComponent
                  :color="markerColor",
                  :coordinates="markerCoordinates"
              /> -->
            <MglMarker
              :coordinates.sync="mapCenterArr"
              color="blue"
            />
            <MglMarker
              v-for="(sale,index) in salesPositions" :key="index"
              @click="setSale(index)"
              :coordinates.sync="sale"
              color="green"
            />
          </MglMap>
        </client-only>
        <div class="current-sale" v-if="currSale">
          <div class="img-carousel">
            <img v-for="(image, index) in currSale.images" :key="index" :src="image" alt="currSale.title">
          </div>
          <div class="current-sale__description">
            <nuxt-link 
              :to="{name:'sale-id', params: {id: currSale.id}}"
              class="current-sale__title"
            >
              <h4 v-if="truncTitle">{{ currSale.title.substring(0,50) }}...</h4>
              <h4 v-else>{{ currSale.title }}</h4>
            </nuxt-link>
            <p v-if="truncDesc">{{ currSale.description.substring(0,100) }}...</p>
            <p v-else>{{ currSale.description }}</p>
            <div class="current-sale__buttons">
              <span class="current-sale__button"><nuxt-link 
                :to="{name:'sale-id', params: {id: currSale.id}}"
              >
                See More
              </nuxt-link></span>
              <span class="current-sale__button">
                <a href="javascript:void(0)" @click="openMaps(currSale)">Get Directions</a>
              </span>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
const { MglMap, MglMarker } = require('vue-mapbox');

export default {
  components: {
    MglMap,
    MglMarker
  },
  layout: 'mapLayout',
  data() {
    return {
        accessToken: 'pk.eyJ1IjoibGxhbmc4IiwiYSI6ImNqeWY3MGU0NzAwYnEzbW84NXh4Znh1dGkifQ.S7lFIAyAgTWFYJtmtAiHrg', // your access token. Needed if you using Mapbox maps
        mapStyle: 'mapbox://styles/llang8/cjyjfe40h1hyz1ct9lsgwjsop', // your map style
        /* mapCenter: {lng: -87.6298, lat: 41.8781}, */
        markerColor: '#000000',
        mapZoom: 12,
        markerCoordinates: [42,-87],
        mapbox: null,
        mapCreated: false,
        currSale: null
    };
  },
  mounted() {
    /* this.createMap(); */
    this.mapbox = Mapbox;
    if(this.$store.state.position === null) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.$store.commit('setUserPosition', {
          position: position.coords
        });
      });
    }
    if (this.$store.state.sales === []) {
      this.$store.dispatch('getSales')
        .then(() => {
        })
      this.$store.dispatch('getBookmarks', {
        uid: this.$store.state.user.uid
      })
    }
  },
  computed: {
    sales() {
      return this.$store.state.sales;
    },
    mapCenter() {
      console.log(this.$store.state.position);
      if(this.$route.query.lat && this.$route.query.lng) {
        return {
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
        }
      }
      else if(this.$store.state.position) {
        return {
          lat: this.$store.state.position.latitude,
          lng: this.$store.state.position.longitude,
        }
      } else {
        return {
          lat: 41.878,
          lng: -87.629
        }
      }
    },
    mapCenterArr() {
      console.log([this.mapCenter.lng,this.mapCenter.lat]);
      return [this.mapCenter.lng,this.mapCenter.lat];
    },
    salesPositions() {
      return this.$store.state.sales.map((sale) => {
        if (sale.geopoint === undefined) {
          return [0,0];
        }
        return [sale.geopoint.longitude, sale.geopoint.latitude];
      })
    },
    truncDesc() {
      if(this.currSale) {
        console.log(this.currSale.description.length > 100);
        return this.currSale.description.length > 100;
      } else {
        return false;
      }
    },
    truncTitle()  {
      if(this.currSale) {
        return this.currSale.title.length > 50;
      } else {
        return false;
      }      
    }
  },
  methods: {
/*     createMap() {
      // We need to set mapbox-gl library here in order to use it in template
      if(process.browser) {
        const Mapbox = require('mapbox-gl');
        this.mapbox = Mapbox;
        this.mapCreated = true;
      }
    }, */
    mapLoad(map) {
      console.log(map)
    },
    setSale(index) {
      console.log(this.$store.state.sales[index]);
      this.currSale = this.$store.state.sales[index];
    },
    openMaps(sale) {
      let lat = sale.geopoint[1];
      let lng = sale.geopoint[0];
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
    }
  }
};
</script>

<style lang="scss">

.map {
    width: 100%;
    height: calc(100vh - 50px);
}

</style>